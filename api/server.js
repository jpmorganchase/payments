const fetch = require('node-fetch');
const https = require('https');
const { createDecipheriv } = require('node:crypto');
const service = {
  encrypted:
    'qen1LwajzOIoQVjBA3bUujuLks8Pf0TpzZnO7VfnjyJOb2YCAXrdexwhGlsNpj3V+3w89xgNm/Bc24NBtvcla8XkdKEQ3l3AhV3XcEnvtWqwDSTKhHtRnKQHWTFWLyIpeeMtNfZospZmE9hsgF+GsnAsNRZoEk+Eesqp8+U2DUuJocK6Fd/cjDEhd+YewA+TMtZjhPiOq/532UBahsdeo8YhBQGKLvSS+XvtX5O1txsfgCw42RV2EZRIKvcoK0ukaxWLypGOrfEYWjC2Zvtx7huPrArZbFubglZyJgff/jOhSTajjB+2EpelgjkmErQZrVu5zYlx3FYbziI7HPLlCoimSk/4RMX+gS8R9ETimRz1Xoah2vyAN7CoS/g15X5aPc36JDYgB4UGa+/HxlSRVbvDp7iK1MUqzyG9gwVf3vm4ipGWrNLyFueHea5uz6et/ZZEmybovOj5XamZHFQ8KEWJ4mmpqtDrLW3+KQlresQQL8FSfR6PQvydtxWg8hPr4J766h/7MOQJsgQQLGgnkA6Exp4J1ZjhlbRYMknF2oSC1y+yi7FZyKcKhTRuorfzgZR9BttS4q4Utn2kHminZpxZjYX+j1lhSXkYtGKTM2ZcAOqbnwsH3RccNGXu953OafuCjksNJ+aYRRPe8UEp7t83dQ0qgUj7Kl6BqYsXy9jL28ttlsIAiougmNgswKKjuQpZi0A43JbprSAlGDS7DnAVlBicPVwxX571TLM0aKJhiJmqDNVXOdk+xUTTWewv1EA+xWlmdy6H73N3vleXdP89nJXXGxbVjUo1Rhqu6vHn22b+Qg4JXbZ170r6giywPaoZdUTtLUXxAl92yfbPVZBZW7qyB8qj7k8v4N6Rk1uYlxarHoPtrrHm0TZc+98kAa2H3cr6FsK0sSqmwhUDE8kLfBoSb9Azb0Yvf1IC7/FhsJuJ9kY4n3cD2dQShSg9vbPNj1Vs+agi38GKklEP4TMix2QOXKD95+E6StdcnVIFiJHlR4pEnbaAchlqN405BZpK4tPC1cHvFrLEAPOhxno74jPvFKIwm6H3BOFasDm/OVR+vUrA0SNzwbv4JbW5hJDhbbXN8UfZSYsTtiznzjUucjPdQMDAwpG5loGeQtn1Wak2WTRmfdK6UeZrcUROjhkTLt6TGzAxgWAOntw/h5sSgkq4sgUGEJ8GO+j9m7qRedLJaVWsv1jWWOI3AlCpfWPm7wsFswB9dJFlsDZZD6+zQyqT/+JUwJxuti0/Eknxle05GbDkJFgU06+KAqPIufNnjMJH8/YjKOPOIuNf4+Jn5CJJcHHJKCaWgLh+BorfTQSPSbH2ChoOghmSqqGBpDVZevUR2jxc88Ri9PvqrgFROTe1fxOyWNGy6FfKmDM6Hq9XD9djXQMo4HdF7Deh0VJQUrpqepcO0+YfFw55NxZ9sToxNYHUocReDlG+aLRvfErSTV2tKJ5dw0bDkr6EHQnwpwyPkmvMgOom/TLCBWndLcUFRpCvcaUq87uqRe1UH6z+nggPwVYtfHk+wwoRLbtsgELPKGfK69uFF25SeSutTxM+IyMFyZGzlkxYl6kLyA/B1nhxDDg57C5GfbLUEcBmGlkz2ax65EeyL2bTTq91zKwQIcUqiPBp0/dv126Hw0h+YXbSzfuWTSz+or5RBztw/aChvru2z0H5w1zUq+UFYOHpNEXGxNiFcMjSRsUx+YNDYM+AkQyW3OQmQSDmUtD+1wm8vQvCJO+vGNUnTv4XzQDhKaSMokJck79Q36BxkRjngXOjfjCZArwrlwmDJnKEFGOwzah9plIWJJRdkDnoGgXm8fWaFOUhfdHUNeX5thQQzhCcX1/6WgchzgpRB9ZA2xt8vUV62dIebfTRWmJpNJbHACUr0J4gCu7aDqI5xmEL2Ej3xZn/0gmWvT8sahzzgo0a6LdWoguk/qMDPGmFeNOHQC8Qg9XWkqTQ1yPwCrJizgJvTML9HL+jkDlO5xGouD4Btg8ItPC7tNKa6WfoYdvKadt8QlM32GDGjPBQCLIwt9gA8kxQR+KtalsqMQAsov+jEuYdP+Gk6RYzMCsxz5/NRWRJcM35Sx74gN+sSucCCCA070PPdX3UdrA8bcibccD32sdqAHbY7C5g4uOk6Bzykd35ucHxc5Dw4Y5w71nz99KXfsLulGtqibZY10ajVYWKihMA1yV4YGPOZvPqq6Ordmlm5fLZIfYwlFh+4XTUKULIV+pCzHO3MlN18nx0CjfeD9VYacktC+Bf85/iQG6Weo78sYT8m5ylFzcSuQC9NRLhxeklwW4/xsUSq3YHrT08Cb/4g/WvXNCCVPm7rTh0BYdjfBa7RSioGqJG56BiMwpJTODNErRlTdgJB/ZSxRu5NSXVx0uNkZnec5s4+nQ+NXj4AmnfyFduMm1+3DTmNcm/+M4iQN7TlDNa+t4h+aDGazKHFzXBM3+OdTpmw6qxkkYmwrP7UAREIdc/YWZOu5ObMEO07exjpt5mZcNqlhkeZ1+r5OjvP1pyjBnGMi/oEFafPBpqPcG2SH+qUcQFKJ650slsYxR0HY6326lJkZwrCgt8ObWFkfeLbtxEOYoOX99fK1s38W8Q/KA3NoA+aCKAq1fbXCGKl84nRx9pG05aIPC6XAKEUFHN4gAiXF9kdVezmNI+kJepCMCRNMESYLqcwWUpNyw2DTrIeQ5PQ0wq+uPXD5lP4gbCh3L6pH2HcTOKxL4uyAN0GsufR89p3u3qFYC8kf9fzJ+pVR/apPSXylXtkLxoIsd//4I57tzfVZHGEIPJZ5KW+/SssFBdOUPrzyiOtauaFAQCdCptGKcm+VpjF38WhBiZ/ubpdL3sn/AmhfT6S2GOxbVjKabjwk+t6h1qkI92XMz///XweAUyEi95vCDSMZqJmmz4c5qPw2l5YDPGPuUV96R0qaO8kAeBWnofvnC2CWBVzO+TLpwbzMXw1IxvxtSTbwc3lLIsQ7l7M1xrf8UTOy9Ecpy14LB4LpdZUvx9EwffiBlWujfhCLW7qmLqhQrTIjqJFNhfCf6+kFoICQTTh4HEsQIug7YLd7twfclTmRNY0hS/57Kpg0Nsagd+4zthMaPFE/RbwMNOCjejOyTu8JUh2NagZQKxEOv9Pgo8ASQLt4CgDSYGvlaE81P/nFPwtMV27mLmbWbbjQlBL1KA0wbBv3Rvdk0ldpgzVfgs/c5PlhE9JPoHiBaCDbnJU/bUqOsBQUsATEFURTqF2Ayn5uJFC+eHVmwhsj8l9aEZYLQEmZjYt3NDFhkdQEEI2DjXk1TQzQgAIZrYeI9LaXmXMFhY1Shg5nHqhJDD21vtrhq1c1CMLv7VawT5mijYSoGunZ7QQpirdNZVGpImyzov04+WNJ4hzZLLlsw8161E5s+1WOvYb5X5f8+kjoRq2uCY7ZJGGUGuQSvtzb4Fz/91qLahgj1IOrVWs2tCrLMrcA18TjwtFSAEUTruhXWujC53wrzQoJvZ0NWToSAQ8JkJFvUA4v6htpAkU3Rsd09sLWS+IGX9RliglW2gKTMyi0M5EDEyAjIfyqcXDEB/tZQv60W0ybG4YeKfH1HshMYEtQNMlB5el53LPhOz8uZv9aErGp5nHCpN9QbuWpFa22gxdposifE1OeMgS4tqvEJv4Sg1AEfTsNXDVL5WFQwSkcyOuH023DAyuYFm1ppial9Yvq4UtuTKsS8VUyfq9zDuGJOl1b2iunEFu2h+HJxfa+//yLVHfdeYc6SdrnmYGqKWFBBFFd70WS2jBRD6pc2ER1MfFVfYb+/SB97CWwPJIM8hU6Diznqg+9toj6i+8SoCwQ7A6n8lEahGh3QU8X3EW37mfyw5rLu/z3/YQt5vbOu1ZUe14PaCDuc9Jkb3N6bbHa7nCQKHuKuiAZxHa7WLbf125kjFO9Fm9Lhdl6y9bU0HQIKENvOfnhDeen9YOJs6myX5U9/7rxK71uauFrWA6Lt3JPQ2/i9A5lUnrLrUx5IEKn++ZCA7RvAPoa/fzqfxyTHXGOiZ9wBJN6QeW7eB9nHjVeb6UpORluBqlGoQf3NlXApHBbk+FUniGzL4bJi7zy0xDmVVPL4hBwScOzGZFCXG+vpUBkqvrO+30usii3HjCS5bOTNhTF+wY4LxGjZsmia963esmYV4q6rrieaFyV4el865xDkKyGvynIxBcQbuQGcvJsmGirspMtPCIGEg65/g18Jv8UlhWKz6Z1RoHVirQMh76bgxUGBJmqOexaJ+73IS/gxZ/AOpT/wT80A4D0RrjzBbjDeAax0gpUED+/r+SbSnBERK4J3B74WTUq60r+TIJcon1xc3E4ZQo12LVI4mKD69n0qwkKKdEa9rR+kzqiuKiuho3mKT63l7DHgubYViY282CD7FIHTAh3g1diHdTPbaP44bi+JJlR4Axt6W0D55GLmhbdN/ruKKo86aXE14+FSPfBCba2FhveBcuO5wVzH+ZaXWiExG+kzrv5NnvnedWYLPC7lc6gYla+Fv2nP1DW0jT3HtnGGnqvLZj8aMuJLHq79naA6Wg/kFIcGnICSBExkFCtcT2/WphsV1QUUUUjJxYiK33IT0Ddug3kKt59yOCL9O9KcBCbHIb1ncrNmPU744+8W5eGJ+EH8HKDjrtA7joHkNsFoKa7vnrd2LPj3hFWevg3WsINBXutH75XE3DYujjQH2Jh2Mbcej9WWTYSo7JT5YojU4owfoXWYNZfJU6UM0PFf3kA8oIBgmGs06En7t/nIifu5Y4G32wEdFSIMcBbwRwHkvKkFzEU5Uv1fsw5zfnUnR3vM1BNHjJyXN+J+ZRFTJwDAaJE7N/2DKD+eVEZ043+S2KLMfsESUNqbPLSPJ+H1f3LO0uXxEl8KzGEVHc6K8jwHsDnI4hZMvxvv+CMozXxMnzdJ2J1FTLTQz1PH/+LWeFayMvK6xbck+Uv8kY9Iad2L8SWWmO0TX7TPuTzj8uo0JCCZIFVR1cmOqU7/3g9i50Agci01wBDk60G5XswzB0dQJ/SG6yNKtMpsHLuAh8kiCVdiuJvx4YqbiWaSMGR/JzOtqYEu1ro9DiCutql+kB7eHN2b4T6SLjwI6z76K+3EGyJx5xQcUfATB6FZ+IpQ+Tb2l2X+dQS8R245zqUas0aV3ms0bJZeHuZbhESyQbCnk/x342H7MzXlIscw4PbjhLPitITLqXbP3PyrbUbc9oB+vpkwgJBTRAZtj8aVtEvALDOjti9qaA7OhNm2vvdRry+0DSLlaRhfod61TfWcp4tw5Ky+g0Pf0z1Dnw092AAumdkVcoTdHQk2J6c/bTuF/fUg1w1zaUNnlVmM3Er+918lHTBpZP3YH2a5b7wz3wKz3OoR7LvKu3IYJD3VmVTi5v5GVWKp+QjO/5Kp340CXZuQyQzUS8+Us6Y3JykyRqMLgn4z28pdzjmRj5yn5uJbYo7sqZCXioRtybjmhyemjJDrW8NKFkAkBOxVmoyeEPbQ7ePEZsYHhEguc9n6E8aYGOfzw4oSdivkTgV5q83l7ZGerJrJijPD+yQD7ps6BO+tO3DQxZwraR+TDaFoc+IgDQTfGikYM2DaoVZkzzHqONad8QsoCcaxEsGae6DOaSSZ4AzMxI534G0dne2WdPQqoWZ82h11CjyTlXaQVRtzWgkza9RZ3oMlIJNFWX3rSmQKh14E6uBS+c2WCDuGwGf1QB2AaU4e34o2KTVxuOUXPt6Bpjsotr0U2BvObZufNuCxNi3/CBqvfsbmX/0S6uJG9FD7ksiV1mRCvLrVc0FP2IAfJUMgfQPtw5FWK56lE9UmThuykVNTJRxqh0FucV57d9cFtW6CwUyem9K6QrHvQj4J+zsjXt82P+OgyZMYoN/8UBQCKAQpr55Z3dyT3VH5kU/SRW+5b6K2boVv4ZOAzb/wfQUE6fr4nXuxHIO+oQuY+W4jB1JlJnDZcVV1wruKHhyO7Qu/36dKIzN3gVeqdPcDq8ij8UT44CAAIybxIyTDoCd9uI7bxs5/0wKXjeSgNbcMdq0mXMGR1bReOuhCiIF5JXCvR96iR6lgD9vxrEyqKGytFlLT9O5UZfy7ArA+iZYlHEZZy2DLa6FuGuPnfHV4lYMKQuWfWVEEhbTVgRTmdKhGfhRw=',
};

const decrpytData = (data) => {
  const algorithm = 'aes-128-cbc';
  const decipher = createDecipheriv(algorithm, process.env.KEY, process.env.IV);
  let decrypted = decipher.update(data.encrypted, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  return JSON.parse(decrypted);
};

const credentials = decrpytData(service);

const httpsOptions = {
  key: credentials.KEY && credentials.KEY.replace(/\\n/g, '\n'),
  cert: credentials.CERT && credentials.CERT.replace(/\\n/g, '\n'),
};

const sslConfiguredAgent = new https.Agent(httpsOptions);

const getAPIEndpoint = (path) => {
  switch (path) {
    case 'status':
      return 'https://apigatewayqaf.jpmorgan.com/tsapi/v1/participants?status=OFFLINE';
    case 'balances':
      return 'https://apigatewayqaf.jpmorgan.com/accessapi/balance';
    case 'transactions':
      return 'https://apigatewayqaf.jpmorgan.com/tsapi/v2/transactions?relativeDateType=PRIOR_DAY';
  }
};

const generateError = (response, responseBody) => {
  return response.status(500).json(responseBody);
};

const postRequest = async (apiEndpoint) => {
  return await fetch(apiEndpoint, {
    agent: sslConfiguredAgent,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      startDate: '2021-09-01',
      endDate: '2021-09-20',
      accountList: [
        {
          accountId: '000000010013324',
        },
      ],
    }),
  });
};

const getRequest = async (apiEndpoint) => {
  return await fetch(apiEndpoint, {
    agent: sslConfiguredAgent,
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
};
export default async function handler(request, response) {
  const { path } = request.query;
  const apiEndpoint = getAPIEndpoint(path);
  try {
    let responseValue;
    if (path === 'balances') {
      responseValue = await postRequest(apiEndpoint);
    } else {
      responseValue = await getRequest(apiEndpoint);
    }
    const responseBody = await responseValue.json();
    if (responseBody.errors || responseBody.fault) {
      console.log(`Error response from API: ${JSON.stringify(responseBody)}`);
      return generateError(response, responseBody);
    }
    return response.status(200).json(responseBody);
  } catch (error) {
    console.log(error);
    return generateError(response, responseBody);
  }
}
