
export interface CheckServiceUseCase {
   execute( url: string  ): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {
   constructor() {
      
   }

   execute = async ( url: string ): Promise< boolean > => {
      try {
         const req = await fetch( url );  
         if ( !req.ok ) {
            throw new Error(`Error on check service ${ url }` );
         }
         console.log('<--------------- JK Checks-service --------------->');
         console.log(`${url} is ok`);
         return true;
      } catch (error) {
         console.log('<--------------- JK Checks-service Error --------------->');
         console.log(error);
         return false;
      }
   }
}