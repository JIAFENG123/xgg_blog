import { Backend } from "../../backend/main";
import { NextApiRequest, NextApiResponse } from "next";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

// eslint-disable-next-line import/no-anonymous-default-export
export default (req: NextApiRequest, res: NextApiResponse) =>
  new Promise(async (resolve) => {
    const listener = await Backend.getListener();
    

    listener(req, res);

    res.on("finish", resolve);
    
  });
