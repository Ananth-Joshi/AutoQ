import AddQuestion from './AddQuestion'
import QuestionsList from './QuestionsList'

function QuestionsPage() {
  return (
    <div className='flex h-[calc(100vh-90px)] w-full'>
        <div className='flex gap-1 justify-around flex-col items-center w-full bg-base-300 rounded-xl h-[95%] mx-10'>
            <div className='text-2xl my-4'>QUESTIONS</div>
            <QuestionsList/>
            <AddQuestion/>
        </div>
    </div>
  )
}

export default QuestionsPage