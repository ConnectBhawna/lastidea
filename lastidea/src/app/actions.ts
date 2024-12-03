"use server";
import { dryrun } from "@permaweb/aoconnect";

export async function performQueryDryrun(query: string) {
  try {
    const result = await dryrun({
      process: "ls75Hu0XXVO4iA5gL4mOFZIa9GiyRaphE-5bsO5rT1k",
      tags: [
        { name: "Action", value: "Query" }
      ],
      data: query 
    });

    if (result.Messages && result.Messages.length > 0) {
      const firstMessage = result.Messages[0];
      
      if (firstMessage.Data) {
        try {
          const parsedData = JSON.parse(firstMessage.Data);
          return parsedData;
        } catch (parseError) {
          console.error("Error parsing query result:", parseError);
          return firstMessage.Data; 
        }
      } else {
        console.error("No data found in the query result");
        return null;
      }
    } else {
      console.error("No messages returned from dryrun");
      return null;
    }
  } catch (error) {
    console.error("Error performing query dryrun:", error);
    return null;
  }
}