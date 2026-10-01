# Veículos App — React Native + Expo + JSON Server

## Descrição
Aplicativo mobile para cadastro e gerenciamento de veículos (trabalho substitutivo). Front-end em React Native; a API REST é simulada com JSON Server e todas as operações usam HTTP real.

## Funcionalidades
- Cadastro de veículos (placa, marca, modelo, ano, cor) com validação
- Listagem com FlatList, cards e mensagem de lista vazia
- Pesquisa (placa/modelo) e filtros (marca/ano), com botão "Limpar filtros"
- Tela de detalhes, edição (PUT) e exclusão (DELETE) com confirmação
- Indicadores de carregamento, mensagens de sucesso/erro e tratamento de API offline

## Tecnologias
React Native, Expo, TypeScript, React Navigation (native stack), Axios, JSON Server 0.17.4.

## Pré-requisitos
- Node.js 18+ e npm
- App **Expo Go** no celular Android (ou Android Studio com um emulador)
- PC e celular na **mesma rede Wi-Fi** (no caso de dispositivo físico)

## Instalação
```bash
git clone <URL_DO_REPOSITORIO>
cd veiculos-app
npm install
npx expo install --fix   # alinha as versões das libs ao SDK do Expo instalado
```

## JSON Server
Em um terminal (deixe aberto):
```bash
npm run api
# equivale a: npx json-server db.json --host 0.0.0.0 --port 3000
```
Teste no navegador do PC: http://localhost:3000/veiculos
O `--host 0.0.0.0` é obrigatório para o celular/emulador conseguirem acessar.

## Configuração de rede
A URL fica em **um único arquivo**: `src/constants/api.ts`.
- **Padrão (recomendado):** `API_HOST_OVERRIDE = ''` — o app detecta o IP do PC pelo Expo (funciona no Expo Go e geralmente no emulador).
- `localhost`: significa "o próprio aparelho". No celular/emulador aponta para ele mesmo, **não** para o PC — não use.
- **Android Emulator:** o PC é `10.0.2.2` → `API_HOST_OVERRIDE = '10.0.2.2'`.
- **Android físico / Expo Go:** use o IP local do PC (Windows: `ipconfig`; Linux/Mac: `ifconfig`/`ip a`), ex.: `API_HOST_OVERRIDE = '192.168.0.10'`.
- Se não conectar, libere a porta 3000 no firewall do PC.

## Execução
```bash
npm start
```
Escaneie o QR Code com o Expo Go, ou pressione `a` para abrir o emulador Android.

## Estrutura
- `src/components` — Button, Input, Loading, EmptyState, VehicleCard
- `src/screens` — Lista, Formulário (cadastro/edição), Detalhes
- `src/services` — `api.ts` (Axios) e `vehicleService.ts` (CRUD)
- `src/navigation` — React Navigation
- `src/types`, `src/utils` (validação), `src/constants` (URL da API, cores)

## Demonstração (roteiro do vídeo)
1. `npm run api` e abrir `localhost:3000/veiculos`; 2. abrir o app e mostrar a lista; 3. cadastrar (mostrar erro de validação antes); 4. pesquisar e filtrar por marca/ano, limpar; 5. abrir detalhes → editar → salvar; 6. excluir e confirmar; 7. atualizar o navegador/`db.json` mostrando as mudanças; 8. (opcional) parar o JSON Server e mostrar a mensagem de erro.
