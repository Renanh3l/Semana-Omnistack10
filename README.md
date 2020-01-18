<h1 align="center">
Semana Omnistack 10</center>
</h1>
<h2 align="center">
DevRadar
</h2>

<p align="center">Aplicação desenvolvida durante a Semana Omnistack 10.0 da <a href="https://rocketseat.com.br/" target="_blank">Rocketseat</a>, localizando desenvolvedores em um raio de 10km por geolocalização. API construída usando Nodejs, cadastro e visualização de desenvolvedores no frontend usando ReactJS, e app mobile para busca de desenvolvedores por tecnologias desenvolvido com React Native.</p>


## Executando o projeto

Antes de tudo, faça um clone deste repositório.


### Backend
Utilizando um terminal, navegue até a pasta do backend usando `cd backend`.

Digite `npm install` e aguarde a instalação das dependências.

Configure a conexão com o banco de dados do MongoDB Atlas no arquivo** src/index.js**

Para executar o backend, digite `npm run dev` ou `yarn dev`.

O servidor estará rodando em http://localhost:3333.



Rotas
------------
**POST**: Cadastrar Dev - http://localhost:3333/devs (Tipo: JSON)

Exemplo:
```json
    {
    	"github_username": "Renanh3l",
    	"techs": "ReactJS, NodeJS",
    	"latitude": -22.8722697,
    	"longitude": -42.0306995
    }
```

**POST**: Atualizar Dev - http://localhost:3333/update (Tipo: JSON)

Exemplo:
```json
{
	"github_username":"renanh3l",
	"name": "Renan Brazil",
	"techs": "ReactJS, PHP"
}
```

**GET**: Listar Devs - http://localhost:3333/devs

**GET**: Buscar Devs - http://localhost:3333/search (Tipo: Query: latitude, longitude, techs)

Exemplo:
http://localhost:3333/search?latitude=-22.8654101&longitude=-42.0484895&techs=ReactJS

Frontend Web
Utilizando um terminal, navegue até a pasta do backend usando `cd frontend`.

Digite `npm install` e aguarde a instalação das dependências.

Para executar o frontend, digite `npm run start` ou `yarn start`.

Acesse http://localhost:3000 no seu navegador.

App mobile
Utilizando um terminal, navegue até a pasta do aplicativo mobile usando `cd mobile`.

Instale o **Expo** em seu smartphone, ou ignore se estiver usando um emulador.

Digite `npm run start` ou `yarn start`.

No seu smartphone, faça um scan do QR Code exibido pelo Expo. Se estiver usando um emulador, clique em `Run on Android/iOS device` no site aberto pelo Expo.

Tecnologias e Dependências

### Backend
- Node.js
- express
- nodemon
- mongoose
- axios
- socket.io

### Frontend Web
- ReactJS
- axios

### App mobile
- React Native
- Expo
- expo-location
- React Navigation
- react-native-maps
- axios
- socket.io
