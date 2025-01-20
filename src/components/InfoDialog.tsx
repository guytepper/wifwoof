import { createCallable } from "react-call";
import { BaseDialog } from "./BaseDialog";

export const InfoDialog = createCallable(({ call }) => {
  return (
    <BaseDialog call={call}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18 }}>
          <span>updates on twitter</span>
          <a href="https://twitter.com/guytepper" target="_blank">
            @wifwoof
          </a>
        </div>
      </div>
    </BaseDialog>
  );
}, 600);
