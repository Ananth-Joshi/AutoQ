import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import NavBar from './components/NavBar/NavBar'
import LandingPage from './components/LandingPage/LandingPage';
import SignUp from './components/AuthPages/SignUp';
import LogIn from './components/AuthPages/LogIn';
import Classes from './components/Classes/Classes';
import SubjectList from './components/Subjects/SubjectList';
import PageNotFound from './components/PageNotFound/PageNotFound';
import SubjectDetail from './components/SubjectDetails/SubjectDetail';
import ChapterList from './components/Chapters/ChapterList';
import PaperList from './components/Papers/PaperList';
import QuestionsPage from './components/Questions/QuestionsPage';
import EditPaperPage from './components/EditPaper/EditPaperPage';

function App() {
  return(
    <div data-theme={'black'} className='absolute w-full' >
      <BrowserRouter>
      <NavBar/>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/classes' element={<Classes/>}>
            {/* Maps to class page outlet */}
            <Route path=':classId' element={<SubjectList/>}/>
          </Route>
          <Route path='/classes/:classId/subjects/:subjectId' element={<SubjectDetail/>}>
            {/* Maps to Subject details outlet */ }
            <Route path='chapters' element={<ChapterList/>}/>
            <Route path='papers' element={<PaperList/>}/>
          </Route>
          <Route path='/classes/:classId/subjects/:subjectId/chapters/:chapterId/questions' element={<QuestionsPage/>}/>
          <Route path='/classes/:classId/subjects/:subjectId/papers/:paperId' element={<EditPaperPage/>}/>
          <Route path="*" element={<PageNotFound/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
