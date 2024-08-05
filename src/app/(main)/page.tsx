import { Button } from "@/components/ui/button";

function MainPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button variant={"destructive"} size={"sm"} asChild></Button>
    </main>
  );
}
export default MainPage;
