const express = require('express');
const mysql = require('mysql');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3000;
app.use(cors());
app.use(bodyParser.json());

// Ejemplo 1 (Endpoint: https://api.powerbi.com/v1.0/myorg/datasets)
app.post('/saveDatasets', async (req, res) => {
  try {
    // Asigna valores fijos a las credenciales
    const username = "MiguelFernandezSevillano@InStrategy100.onmicrosoft.com";
    const password = "Miguelyjeni1";
    const app_id = "efb122e5-0640-47be-80b3-839b87233f4f";
    const tenant_id = "d274ab4e-c79f-43f5-aa4b-3070d7768a45";

    const authority_url = 'https://login.microsoftonline.com/' + tenant_id;
    const scopes = ['https://analysis.windows.net/powerbi/api/.default'];

    // Obtener token de Power BI
    const response = await axios.post(
      `${authority_url}/oauth2/v2.0/token`,
      new URLSearchParams({
        grant_type: 'password',
        client_id: app_id,
        scope: scopes.join(' '),
        username: username,
        password: password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const access_token = response.data.access_token;

    // Obtener datasets de Power BI
    const datasetEndpoint = 'https://api.powerbi.com/v1.0/myorg/datasets';
    const datasetResponse = await axios.get(datasetEndpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (datasetResponse.status === 200) {
      console.log('Respuesta de Power BI:', datasetResponse.data);
      const datasets = datasetResponse.data.value;

      res.status(200).json({ message: 'Datos de Power BI obtenidos correctamente.', datasets });
    } else {
      res.status(500).send('Error al obtener datasets de Power BI.');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error en el servidor.');
  }
});

/*
// Ejemplo 2 (Endpoint: https://api.powerbi.com/v1.0/myorg/datasets/${datasetId}/executeQueries)
app.post('/executeQueries', async (req, res) => {
  try {
    // Asigna valores fijos a las credenciales
    const username = "MiguelFernandezSevillano@InStrategy100.onmicrosoft.com";
    const password = "Miguelyjeni1";
    const app_id = "efb122e5-0640-47be-80b3-839b87233f4f";
    const tenant_id = "d274ab4e-c79f-43f5-aa4b-3070d7768a45";

    const authority_url = 'https://login.microsoftonline.com/' + tenant_id;
    const scopes = ['https://analysis.windows.net/powerbi/api/.default'];

    // Obtener token de Power BI
    const response = await axios.post(
      `${authority_url}/oauth2/v2.0/token`,
      new URLSearchParams({
        grant_type: 'password',
        client_id: app_id,
        scope: scopes.join(' '),
        username: username,
        password: password,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    const access_token = response.data.access_token;

    // ID del conjunto de datos (reemplaza 'tu_dataset_id' con el ID real)
    const datasetId = '2b4f22a8-656e-4ecc-9fe4-489e9be01ba6';

    // Endpoint para ejecutar consultas
    const executeQueriesEndpoint = `https://api.powerbi.com/v1.0/myorg/datasets/${datasetId}/executeQueries`;

    // Consultas de ejemplo (reemplaza según tus necesidades)
    const sampleQueries = [
      {
        query: 'EVALUATE VALUES(financials)',
      },
    ];

    // Cuerpo de la solicitud
    const requestBody = {
      queries: sampleQueries,
      serializerSettings: {
        includeNulls: true,
      },
      impersonatedUserName: 'MiguelFernandezSevillano@InStrategy100.onmicrosoft.com',
    };

    // Realizar la solicitud para ejecutar consultas
    const executeQueriesResponse = await axios.post(executeQueriesEndpoint, requestBody, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
    });

    if (executeQueriesResponse.status === 200) {
      console.log('Respuesta de ejecución de consultas:', executeQueriesResponse.data);
      const queryResults = executeQueriesResponse.data.results;

      res.status(200).json({ message: 'Consultas ejecutadas correctamente.', queryResults });
    } else {
      res.status(500).send('Error al ejecutar consultas en Power BI.');
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error en el servidor.');
  }
});
*/

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

