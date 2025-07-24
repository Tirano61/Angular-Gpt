

import { Injectable } from '@angular/core';
import { orthographyUseCase } from '@use-cases/orthography/orthography.use-case';
import { prosConsStreamUseCase } from '@use-cases/pros-cons/pros-cons-stream.use-case';
import { prosConsUseCase } from '@use-cases/pros-cons/pros-cons.use-case';
import { from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpenAiService {
    
    checkOrthopraphy( prompt: string ){
        return from( orthographyUseCase( prompt ));
    }

    checkProsCons( prompt: string ){
        return from( prosConsUseCase( prompt ));
    }

    checkProsConsStream( prompt: string ){
        return  prosConsStreamUseCase( prompt );
    }
    
}