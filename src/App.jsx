import { Route, Routes } from "react-router-dom";
import "./App.scss";
import SideBar from "./layout/SideBar";
import SingleFile from "./components/SingleFile.jsx";
import FileList from "./components/FileList";
import Header from './components/Header'
import { DataProvider } from "./Context/DataContext";
const App = () => {
  return (
    <>
      <DataProvider>
        <SideBar />
        <div className="content-container">
        <Header/>
          <Routes>
            <Route path="/" element={<FileList />} />
            <Route path="/:tableId" element={<SingleFile />} />
          </Routes>
        </div>
      </DataProvider>
    </>
  );
};

export default App;
