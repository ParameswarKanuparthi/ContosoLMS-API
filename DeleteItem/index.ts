import { AzureFunction, Context, HttpRequest } from "@azure/functions"
//import { getuserid } from "../CreateItem/Common/Utils";
import { deleteItem } from "../DataAccess/item-repository";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log.info('Update item started');
   
    const id=context.bindingData.id;
    //const reqid=getuserid();

    try{
        await deleteItem(id);
        context.res={
            status:204
        };
    }catch(error){
        if(error.message.includes("Entity with the specified id does not exist in the system")){
            context.res={
                status: 404
            };
        }else{
            throw error;
        }
    }


    context.log.info('Update item completed');
    context.done();
};

export default httpTrigger;