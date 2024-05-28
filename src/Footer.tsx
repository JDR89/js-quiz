import { Button} from "@mui/material"
import { useQuestionsStore } from "./store/questions"


export const Footer = () => {

  const reset = useQuestionsStore(state=>state.reset)

  return (
    <div className="mt-5">


      <Button onClick={()=>reset()} variant="contained" sx={{marginTop:"10px"}}>
        Reset
      </Button>

  
        
    </div>
  )
}
