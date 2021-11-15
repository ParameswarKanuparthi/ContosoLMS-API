import { AzureFunction, Context, HttpRequest } from "@azure/functions"
//import { getuserid } from "../CreateItem/Common/Utils";
import { getAllItems } from "../DataAccess/item-repository";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log.info('Get all items started');
    context.log.info('Get all items is in m0');

    

    const item = await getAllItems();
    context.log.info('Get all items is in m1');

    if(item && item.length > 0){
        context.res={
            status: 200,
            body: item
        };
    }else{
        context.res={
            status: 204
        };
    }
    context.log.info('Get all items completed');
    context.done();
};

export default httpTrigger;