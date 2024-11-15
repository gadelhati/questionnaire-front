import { useState } from "react";
import { Questionnaire } from "./questionnaire";
import { NewQuestionnaire } from "./NewQuestionnaire";

export const App = () => {
    const [tabulation, setTabulation] = useState<boolean>(false);

    return (
        <>
            <nav className="tab">
                <button className="tablinks" onClick={() => setTabulation(!tabulation)} id="answerQuestion">Questões</button>
                <button className="tablinks" onClick={() => setTabulation(!tabulation)} id="addQuestionnaire">Arquivo</button>
            </nav>
            <div id="answerQuestion" hidden={tabulation} className="tabcontent">
                <Questionnaire/>
            </div>
            <div id="addQuestionnaire" hidden={!tabulation} className="tabcontent">
                <NewQuestionnaire/>
            </div>
        </>
    )
}