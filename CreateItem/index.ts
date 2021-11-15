import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { NewItem } from "../Models/new-item";
import { Item } from "../Models/item"; 
import { ItemRecord } from "../Models/item-record";
import { getGuid } from "./Common/Utils";
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    context.log.info('Create new item started');

    const newItem = req.body as NewItem;

    if(newItem){
        const item={
            id: getGuid(),
            start_date:newItem.start_date,
            end_date:newItem.end_date,
            cc:newItem.cc,
            type:newItem.type,
            comment:newItem.comment,
            status:newItem.status,
            days:newItem.days
        } as Item

        const record={
            user_id: newItem.user_id,
            ...item
        } as ItemRecord

        context.bindings.record=record;

        context.res={
            status:201,
            body: record
        };
    }else{
        context.res={
            status: 400
        };
        context.log.error('Create new item invalid', context.invocationId, JSON.stringify(newItem));

    }
    context.log.info('Create new item completed');
    context.done();

};

export default httpTrigger;