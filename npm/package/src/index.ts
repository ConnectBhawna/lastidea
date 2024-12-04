import { dryrun, message, createDataItemSigner } from "@permaweb/aoconnect";
import { Project, IndexerOptions } from "./types";

const DEFAULT_PROCESS = "ls75Hu0XXVO4iA5gL4mOFZIa9GiyRaphE-5bsO5rT1k";

export async function query(
  searchTerm: string,
  options: IndexerOptions = {}
): Promise<Project[] | null> {
  try {
    const result = await dryrun({
      process: options.process || DEFAULT_PROCESS,
      tags: [
        { name: "Action", value: "Query" },
        ...(options.tags || [])
      ],
      data: searchTerm
    });

    if (result.Messages && result.Messages.length > 0) {
      const firstMessage = result.Messages[0];

      if (firstMessage.Data) {
        try {
          const parsedData = JSON.parse(firstMessage.Data);
          return parsedData;
        } catch (parseError) {
          console.error("Error parsing query result:", parseError);
          return null;
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

export async function index(
  data: Project,
  wallet: any,
  options: IndexerOptions = {}
): Promise<string | null> {
  try {
    const result = await message({
      process: options.process || DEFAULT_PROCESS,
      signer: createDataItemSigner(wallet),
      tags: [
        { name: "Action", value: "Index" },
        ...(options.tags || [])
      ],
      data: JSON.stringify(data),
    });

    return result;
  } catch (error) {
    console.error("Error performing message:", error);
    return null;
  }
}

export * from "./types";