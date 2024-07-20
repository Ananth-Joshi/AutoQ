import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { db } from "../firebase/firebaseconfig"

export interface paperContentInterface{
    qNumber?:number,
    type:'question'|'heading',
    content:string,
    marks?:string
  }

export interface paperType{
    name:string,
    title:string,
    marks:string,
    subject:string,
    instructions:string,
    duration:string,
    body:Array<paperContentInterface>

}



//Function to create a document for storing each users data seperately with their uid and email fields.
export const createUserDocument=async(email:string|null,uid:string)=>{
    try{
        const usersCollection=collection(db,'Users')
        const document=doc(usersCollection,uid)
        await setDoc(document,{email:email})
    }catch(error){
        console.error('Error creating user document.')
    }
}

//Get list of class documents.
export const getClasses=async(uid:string|unknown)=>{
    try{
        const usersCollection=collection(db,`Users/${uid}/Classes`);
        const data=await getDocs(usersCollection);
        return data.docs
    }catch(error){
        console.error('Error fetching user document.')
    }
}

//Add a new class.
export const createClass=async(uid:string|unknown,className:string)=>{
    try{
        const classCollection=collection(db,`Users/${uid}/Classes`)
        const document=doc(classCollection)
        await setDoc(document,{name:className})
    }catch(error){
        console.error('Error creating Class.')
    }
}


//Delete a class
export const deleteClass=async(uid:string|unknown,cid:string)=>{
    try{
        const classCollection=collection(db,`Users/${uid}/Classes`)
        const document=doc(classCollection,cid);
        await deleteDoc(document);
    }catch(error){
        console.error('Error Deleting Class.');
    }
}


//Get list of class documents.
export const getSubjects=async(uid:string|unknown,cid:string|unknown)=>{
    try{
        const subjectCollection=collection(db,`Users/${uid}/Classes/${cid}/Subjects`);
        const data=await getDocs(subjectCollection);
        return data.docs;
    }catch(error){
        console.error('Error fetching subjects.');
    }
}

//Create a subject.
export const createSubject=async(uid:string|unknown,cid:string|unknown,subjectName:string)=>{
    try{
        const subjectCollection=collection(db,`Users/${uid}/Classes/${cid}/Subjects`);
        const document=doc(subjectCollection)
        await setDoc(document,{name:subjectName})
    }catch(error){
        console.error('Error creating Subject.')
    }
}

//Delete a subject.
export const deleteSubject=async(uid:string|unknown,cid:string|unknown,sid:string)=>{
    try{
        const subjectCollection=collection(db,`Users/${uid}/Classes/${cid}/Subjects`);
        const document=doc(subjectCollection,sid)
        await deleteDoc(document);
    }catch(error){
        console.error('Error Deleting Subject.');
    }
}


//Get chapter list.
export const getChapters=async(uid:string|unknown,cid:string|unknown,sid:string|unknown)=>{
    try{
        const chapterCollection=collection(db,`Users/${uid}/Classes/${cid}/Subjects/${sid}/Chapters`);
        const data=await getDocs(chapterCollection)
        return data.docs
    }catch(error){
        console.error('Error fetching chapter List.')
    }
}


//Create a subject.
export const createChapter=async(uid:string|unknown,cid:string|unknown,sid:string|unknown,chapterName:string)=>{
    try{
        const chapterCollection=collection(db,`Users/${uid}/Classes/${cid}/Subjects/${sid}/Chapters`);
        const document=doc(chapterCollection)
        await setDoc(document,{name:chapterName})
    }catch(error){
        console.error('Error creating Chapter.')
    }
}


//Delete a subject.
export const deleteChapter=async(uid:string|unknown,cid:string|unknown,sid:string|unknown,chapterId:string)=>{
    try{
        const chapterCollection=collection(db,`Users/${uid}/Classes/${cid}/Subjects/${sid}/Chapters`);
        const document=doc(chapterCollection,chapterId)
        await deleteDoc(document)
    }catch(error){
        console.error('Error Deleting Chapter.')
    }
}



//Get paper list.
export const getPapersList=async(uid:string|unknown,cid:string|unknown,sid:string|unknown)=>{
    try{
        const paperCollection=collection(db,`Users/${uid}/Classes/${cid}/Subjects/${sid}/Papers`);
        const data=await getDocs(paperCollection)
        return data.docs
    }catch(error){
        console.error('Error fetching Question Paper List.')
    }
}


//Create a paper.
export const createPaper=async(uid:string|unknown,cid:string|unknown,sid:string|unknown,paperName:string)=>{
    try{
        const paperCollection=collection(db,`Users/${uid}/Classes/${cid}/Subjects/${sid}/Papers`);
        const document=doc(paperCollection)
        await setDoc(document,{name:paperName,body:[],title:'',marks:'',subject:'',instructions:'',duration:''})
    }catch(error){
        console.error('Error creating paper.')
    }
}


//Delete a paper.
export const deletePaper=async(uid:string|unknown,cid:string|unknown,sid:string|unknown,paperId:string)=>{
    try{
        const paperCollection=collection(db,`Users/${uid}/Classes/${cid}/Subjects/${sid}/Papers`);
        const document=doc(paperCollection,paperId)
        await deleteDoc(document)
    }catch(error){
        console.error('Error Deleting paper.')
    }
}



//Get questions.
export const getQuestions=async(uid:string|unknown,cid:string|unknown,sid:string|unknown,chapterId:string|unknown)=>{
    try{
        const questionCollection=collection(db,`Users/${uid}/Classes/${cid}/Subjects/${sid}/Chapters/${chapterId}/Questions`);
        const data=await getDocs(questionCollection)
        return data.docs
    }catch(error){
        console.error('Error fetching Questions.')
    }
}


//Create a question.
export const createQuestion=async(uid:string|unknown,cid:string|unknown,sid:string|unknown,chapterId:string|unknown,question:string)=>{
    try{
        const questionCollection=collection(db,`Users/${uid}/Classes/${cid}/Subjects/${sid}/Chapters/${chapterId}/Questions`);
        const document=doc(questionCollection)
        await setDoc(document,{question:question})
    }catch(error){
        console.error('Error adding question.')
    }
}


//Delete a question.
export const deleteQuestion=async(uid:string|unknown,cid:string|unknown,sid:string|unknown,chapterId:string|unknown,questionId:string)=>{
    try{
        const questionCollection=collection(db,`Users/${uid}/Classes/${cid}/Subjects/${sid}/Chapters/${chapterId}/Questions`);
        const document=doc(questionCollection,questionId)
        await deleteDoc(document)
    }catch(error){
        console.error('Error Deleting question.')
    }
}


//Get paper content.
export const getPaperContents=async(uid:string|unknown,cid:string|unknown,sid:string|unknown,paperId:string|undefined)=>{
    try{
        const paperCollection=collection(db,`Users/${uid}/Classes/${cid}/Subjects/${sid}/Papers`);
        const paperDoc=doc(paperCollection,paperId)
        const data=await getDoc(paperDoc)
        return data.data() as paperType
    }catch(error){
        console.error('Error Fetching paper content.')
    }

}

//Save paper headers.

export const savePaper=async(uid:string|unknown,cid:string|unknown,sid:string|unknown,paperId:string|undefined,paperHeaderData:object)=>{
    try{
        const paperCollection=collection(db,`Users/${uid}/Classes/${cid}/Subjects/${sid}/Papers`);
        const paperDoc=doc(paperCollection,paperId)
        await setDoc(paperDoc,paperHeaderData,{merge:true})
    }catch(error){
        console.error('Error Updating paper content.')
    }
}



