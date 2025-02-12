import secrets from "./secrets.js";

async function fetchReport() {
  // Intervalo de fechas que acotarán la solicitud
  const dateIni = "20250211000000";
  const dateEnd = "20250212000000";

  const myHeaders = new Headers();
  myHeaders.append("wolkvox_server", secrets.wolkvox_server);
  myHeaders.append("wolkvox-token", secrets.wolkvox_token);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    // Usamos await para esperar la respuesta del fetch
    const response = await fetch(
      `https://wv${secrets.wolkvox_server}.wolkvox.com/api/v2/reports_manager.php?api=chat_1&date_ini=${dateIni}&date_end=${dateEnd}`,
      requestOptions
    );

    const result = await response.json(); // Esperamos que el texto esté disponible
    return result; // Devolvemos el resultado
  } catch (error) {
    console.error(error);
  }
}

const data = await fetchReport(); // Esperamos el resultado de fetchReport
const filteredData = data.data.filter((chat) => chat.cod_act === "Consulta");
console.log(filteredData);
