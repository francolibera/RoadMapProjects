import { argv, exit } from "process";

const username = argv[2];

if (!username) {
  console.error("Please provide a GitHub username as a command-line argument.");
  exit(1);
};

const url = `https://api.github.com/users/${username}/events`;

async function fetchActivity() {
    try {
        const response = await fetch(url, {
            headers: {
                "User-Agent": "GitHub User Activity App",
            },
        });

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Usuario no encontrado.");
            }
            throw new Error(`Error al obtener datos: ${response.status}`);
        }


        const data = (await response.json()) as any[];

        if (data.length === 0) {
            console.log("Este usuario no tiene actividad reciente.");
            return;
        }

        console.log(`\n🔎 Actividad reciente de: ${username}\n`);

        for (let i = 0; i < data.length; i++) {
            const event = data[i];
            let action = "";

            try {
                if (event.type === "PushEvent") {
                    let pushCount = 1;

                    while (
                        i + 1 < data.length &&
                        data[i + 1].type === "PushEvent" &&
                        data[i + 1].repo.id === event.repo.id
                    ) {
                        pushCount++; 
                        i++;         
                    }

                    action = `Pushed ${pushCount} commit(s) to ${event.repo.name}`;
                
                } else {
                    switch (event.type) {
                        case "IssuesEvent":
                            action = `${event.payload.action} an issue in ${event.repo.name}`;
                            break;
                        
                        case "WatchEvent":
                            action = `Starred ${event.repo.name}`;
                            break;
                        
                        case "ForkEvent":
                            action = `Forked ${event.repo.name}`;
                            break;
                        
                        case "CreateEvent":
                            action = `Created ${event.payload.ref_type} in ${event.repo.name}`;
                            break;
                        
                        default:
                            action = `${event.type.replace("Event", "")} in ${event.repo.name}`;
                            break;
                    }
                }

                console.log(`- ${action}`);

            } catch (err) {
                console.error(`❌ Error procesando evento: ${(err as Error).message}`);
            }
        } 

    } catch (error: any) {
        console.error(`❌ Error general: ${error.message}`);
    }
}

fetchActivity();


