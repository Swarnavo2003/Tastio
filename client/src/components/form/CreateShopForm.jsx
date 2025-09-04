import { Utensils } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const CreateShopForm = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-col items-center gap-2">
          <div className="bg-primary/30 rounded-full w-16 p-3">
            <Utensils className="text-primary size-10" />
          </div>
          <h1 className="text-2xl font-semibold text-primary">Create Shop</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="Name"
              className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>City</Label>
              <Input
                type="text"
                placeholder="Name"
                className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="space-y-2">
              <Label>State</Label>
              <Input
                type="text"
                placeholder="Name"
                className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Address</Label>
            <Input
              type="text"
              placeholder="Name"
              className="focus:outline-none ring-0 focus:ring-offset-0 focus:border-input focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          <div className="space-y-2">
            <Label>Image</Label>
            <Input type="file" accept="image/*" className="cursor-pointer" />
          </div>

          <Button>Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateShopForm;
