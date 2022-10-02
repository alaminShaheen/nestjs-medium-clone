import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { Pagination } from "../../shared/pagination/Pagination";

export const ApiPaginatedResponse = <TModel extends Type<any>> (
    model: TModel
) => {
    return applyDecorators(
        ApiExtraModels(Pagination),
        ApiOkResponse({
            description: "Successfully received model list",
            schema: {
                allOf: [
                    { $ref: getSchemaPath(Pagination) },
                    {
                        properties: {
                            results: {
                                type: "array",
                                items: { $ref: getSchemaPath(model) }
                            }
                        }
                    }
                ]
            }
        })
    );
};
