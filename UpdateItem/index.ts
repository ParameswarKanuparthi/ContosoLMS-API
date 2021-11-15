import { AzureFunction, Context, HttpRequest } from "@azure/functions"
//import { getuserid } from "../CreateItem/Common/Utils";
import { updateItem } from "../DataAccess/item-repository";
import { Item } from "../Models/item";
import { ItemRecord } from "../Models/item-record";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log.info('Update item started');
    
    const id=context.bindingData.id;
    //const reqid=getuserid();
    
    const item=req.body as Item;

    if(item){
        const itemRecord={
            id: id,
            user_id:item.user_id,
            start_date:item.start_date,
            end_date:item.end_date,
            cc:item.cc,
            type:item.type,
            comment:item.comment,
            status:item.status,
            days:item.days
        } as ItemRecord;

        try{
            await updateItem(id,item.user_id,itemRecord);
            context.res={
                status:200,
                body:itemRecord
            };
        }catch(error){
            if(error.message.includes("Entity withthe specified id does not exist in the system")){
                context.res={
                    status:404
                };
            }else{
                throw error;
            }
        }

    }else{
        context.res={
            status: 400
        };
    }

    context.log.info('Update item completed');
    context.done();



};

export default httpTrigger;

