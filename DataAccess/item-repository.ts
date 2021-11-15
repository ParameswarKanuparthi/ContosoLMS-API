import { CosmosClient } from "@azure/cosmos";
import { ItemRecord } from "../Models/item-record";

function getCosmosDbContainer() {
    //const cosmosDbConnectionString = process.env["shdevdb_DOCUMENTDB"];

    const client = new CosmosClient("AccountEndpoint=https://contosoleavemanagement.documents.azure.com:443/;AccountKey=lK0oP2Y45B2DyR3MIRQjFSSyhHSVzh0S3gau0aNYDigY8k3lobmOLY9lbHVsWBpilfFPYJ0IYPdzkfDc5uvLkw==;");
    const database = client.database("ContosoLMS");
    const container = database.container("EmployeeLeaveStatus");

    return container;
}

export async function getAllItems(): Promise<ItemRecord[]> {
    const querySpec = {
        query: `SELECT * from c` 
      };
      
    const container = getCosmosDbContainer();
    const { resources: item } = await container.items
        .query(querySpec)
        .fetchAll();

    return item.map(data => {
        return {
            id: data.id,
            user_id: data.user_id,
            start_date:data.start_date,
            end_date:data.end_date,
            cc:data.cc,
            type:data.type,
            comment:data.comment,
            status:data.status,
            days:data.days
        } as ItemRecord;
    });
}

export async function deleteItem(id: string): Promise<any> {
    const container = getCosmosDbContainer();
    const { resource: result } = await container.item(id).delete();
    return result;
}

export async function updateItem(id: string, reqid: string, todoItem: ItemRecord): Promise<ItemRecord> {
    const container = getCosmosDbContainer();
    const { resource: updatedItem } = await container
                                        .item(id)
                                        .replace(todoItem);
    return updatedItem;
}

export async function createItem(todoItem: ItemRecord) {
    const container = getCosmosDbContainer();
    const { resource: createdItem } = await container.items.create(todoItem);
    return createdItem;
}