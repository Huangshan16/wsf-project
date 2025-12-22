import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderCircleIcon, UsersIcon } from "lucide-react";
import * as React from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/common/hooks";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { setTrulienceSettings } from "@/store/reducers/global";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

export function TrulienceCfgSheet() {
  const dispatch = useAppDispatch();
  const trulienceSettings = useAppSelector(
    (state) => state.global.trulienceSettings
  );
  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "bg-transparent"
        )}
      >
        <UsersIcon />
      </SheetTrigger>
      <SheetContent className="w-[400px] overflow-y-auto sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Trulience 虚拟形象</SheetTitle>
          <SheetDescription>
            在此配置 Trulience 虚拟形象设置，为对话展示更直观的陪伴形象。
          </SheetDescription>
        </SheetHeader>

        <div className="my-4">
          <TrulienceCfgForm
            initialData={{
              enable_trulience_avatar: trulienceSettings.enabled,
              trulience_avatar_id: trulienceSettings.avatarId,
              trulience_avatar_token: trulienceSettings.avatarToken,
              trulience_large_window:
                trulienceSettings.avatarDesktopLargeWindow,
              trulience_sdk_url: trulienceSettings.trulienceSDK,
              trulience_animation_url: trulienceSettings.animationURL,
            }}
            onUpdate={async (data) => {
              if (data.enable_trulience_avatar === true) {
                if (!data.trulience_avatar_id) {
                  toast.error("Trulience 设置", {
                    description: "请填写 Trulience Avatar ID",
                  });
                  return;
                }
              }
              dispatch(
                setTrulienceSettings({
                  enabled: data.enable_trulience_avatar as boolean,
                  avatarId: data.trulience_avatar_id as string,
                  avatarToken: data.trulience_avatar_token as string,
                  avatarDesktopLargeWindow:
                    data.trulience_large_window as boolean,
                  trulienceSDK: data.trulience_sdk_url as string,
                  animationURL: data.trulience_animation_url as string,
                })
              );
              toast.success("Trulience 设置", {
                description: "设置已更新",
              });
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}

const TrulienceCfgForm = ({
  initialData,
  onUpdate,
}: {
  initialData: Record<string, string | boolean | null | undefined>;
  onUpdate: (data: Record<string, string | boolean | null>) => void;
}) => {
  const formSchema = z.record(
    z.string(),
    z.union([z.string(), z.boolean(), z.null()])
  );
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });
  const { watch } = form;
  // Watch for changes in "enable_trulience_avatar" field
  const enableTrulienceAvatar = watch("enable_trulience_avatar");

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onUpdate(data);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          key={"enable_trulience_avatar"}
          control={form.control}
          name={"enable_trulience_avatar"}
          render={({ field }) => (
            <FormItem>
              <FormLabel>启用 Trulience 虚拟形象</FormLabel>
              <div className="flex items-center justify-between">
                <FormControl>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={field.value === true}
                      onCheckedChange={field.onChange}
                    />
                  </div>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        {enableTrulienceAvatar && (
          <>
            <FormField
              key={"trulience_avatar_id"}
              control={form.control}
              name={"trulience_avatar_id"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trulience Avatar ID</FormLabel>
                  <div className="flex items-center justify-between">
                    <FormControl>
                      <Input
                        {...field}
                        value={
                          field.value === null || field.value === undefined
                            ? ""
                            : field.value.toString()
                        }
                        type={"text"}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              key={"trulience_avatar_token"}
              control={form.control}
              name={"trulience_avatar_token"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trulience Avatar 令牌</FormLabel>
                  <div className="flex items-center justify-between">
                    <FormControl>
                      <Input
                        {...field}
                        value={
                          field.value === null || field.value === undefined
                            ? ""
                            : field.value.toString()
                        }
                        type={"text"}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              key={"trulience_large_window"}
              control={form.control}
              name={"trulience_large_window"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>使用大窗口展示虚拟形象</FormLabel>
                  <div className="flex items-center justify-between">
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value === true}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              key={"trulience_sdk_url"}
              control={form.control}
              name={"trulience_sdk_url"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trulience SDK 地址</FormLabel>
                  <div className="flex items-center justify-between">
                    <FormControl>
                      <Input
                        {...field}
                        value={
                          field.value === null || field.value === undefined
                            ? ""
                            : field.value.toString()
                        }
                        type={"text"}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              key={"trulience_animation_url"}
              control={form.control}
              name={"trulience_animation_url"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trulience 动画地址</FormLabel>
                  <div className="flex items-center justify-between">
                    <FormControl>
                      <Input
                        {...field}
                        value={
                          field.value === null || field.value === undefined
                            ? ""
                            : field.value.toString()
                        }
                        type={"text"}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <LoaderCircleIcon className="h-4 w-4 animate-spin" />
              <span>保存中...</span>
            </>
          ) : (
            "保存设置"
          )}
        </Button>
      </form>
    </Form>
  );
};
