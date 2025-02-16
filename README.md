# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


Feedback:
- Cách đặt tên các function 
- Tách action in reducer
- Sửa lại cách xử lý async, await




Brainstormgit
- show todos -> todos.map() -> render UI
- filter todo
    - defaultData: A, B, C
    - todos -> show data
    - defaultData -> filter -> update todos -> A, B
    - defaultData -> filter All -> update todos -> A, B, C
    - create action
    -