import { render } from "solid-js/web";
import "./style.css";

import Editor from "./components/editor/editor";

function App() {
  return <Editor />;
}

render(() => <App />, document.getElementById("app"));
