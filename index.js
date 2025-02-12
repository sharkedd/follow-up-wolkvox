import secrets from "./secrets.js";
// Intervalo de fechas que acotarán la solicitud
const dateIni = "20250211000000";
const dateEnd = "20250212000000";

async function fetchChats() {
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
    return result.data; // Devolvemos el resultado
  } catch (error) {
    console.error(error);
  }
}

async function fetchConversations() {
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
      `https://wv${secrets.wolkvox_server}.wolkvox.com/api/v2/reports_manager.php?api=chat_2&date_ini=${dateIni}&date_end=${dateEnd}`,
      requestOptions
    );

    const result = await response.json(); // Esperamos que el texto esté disponible
    return result.data; // Devolvemos el resultado
  } catch (error) {
    console.error(error);
  }
}

function obtainConversationInfoFromChat(conn_id, conversationsArray) {
  const conversationData = conversationsArray.find(
    (conversation) => conversation.conn_id === conn_id
  );

  if (!conversationData) {
    return null;
  }

  return conversationData.conversation;
}

const chatsData = await fetchChats();
const filteredChats = chatsData.filter((chat) => chat.cod_act === "Consulta");
const conversationsData = await fetchConversations();

filteredChats.forEach((chat) => {
  //CONTACTOS
  let customer_name = chat.customer_name; //nombre y apellido
  let identificador = chat.customer_phone; //Teléfono como identificador
  let email = chat.customer_email; //email (puede que no exista)
  //Agregar timezone

  //CASOS
  let connectionId = chat.conn_id; //identificador del caso
  let origen = chat.channel;
  let cod_act = chat.cod_act; //Producto --> (obtener id de beaware)
  let description_cod_act = chat.description_cod_act; //Tipo --> (obtener id de beaware)
  //subtipo --> (no aplica?)
  //idcontacto --> Obtener al crear contacto
  //asunto --> Inventar alguna combinación

  //Campos extras
  let date = chat.date; //Fecha del chat
  let agent_id = chat.agent_id; //Id del agente, no sirve?
  let agent_name = chat.agent_name; // Nombre del agente
  let comments = chat.comments; // Algún comentario del agente

  const filteredConversations = obtainConversationInfoFromChat(
    connectionId,
    conversationsData
  );

  if (!filteredConversations) {
    return;
  }

  console.log(`Customer name: ${customer_name}`);
  console.log(`Razón: ${cod_act}`);
  filteredConversations.forEach((conversation) => {
    console.log(`Enviado por: ${conversation.from_name}`);
    console.log(conversation.date);
  });
  console.log();
  console.log(`Interacciones totales: ${filteredConversations.length}`);
  console.log(
    "----------------------------------------------------------------------------------------------------------------------------------------------------"
  );

  // OBTENER CONVERSACIONES DEL CHAT

  // BUSCAR O CREAR CONTACTO, RETORNANDO SU ID

  // CREAR CASO, RETORNANDO SU ID

  // AGREGAR NOTAS, CON LA ID DEL CASO
});

/*
conversationsData.forEach((chat) => {
  console.log(
    "----------------------------------------------------------------------------------------------------------------------------------------------------"
  );
  console.log(`Id de la conexión: ${chat.conn_id}`);
  console.log(`Nombre cliente: ${chat.customer_name}`);
  chat.conversation.forEach((conversation) => {
    conversations.append(conversation);
  });
});
*/

//const data = await fetchChats(); // Esperamos el resultado de fetchReport
//const filteredData = data.data.filter((chat) => chat.cod_act === "Consulta");
//console.log(filteredData);
