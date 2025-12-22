"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  BoxesIcon,
  LoaderCircleIcon,
  SettingsIcon,
  Trash2Icon,
} from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "@/common";
import type { AddonDef, Graph } from "@/common/graph";
import { useGraphs } from "@/common/hooks";
import { Button, buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function RemotePropertyCfgSheet() {
  const dispatch = useAppDispatch();
  const { selectedGraph, updateGraph } = useGraphs();
  const graphName = useAppSelector((state) => state.global.selectedGraphId);

  const [selectedExtension, setSelectedExtension] = React.useState<string>("");
  const selectedExtensionNode = selectedGraph?.nodes.find(
    (n) => n.name === selectedExtension
  );
  const addonModules = useAppSelector((state) => state.global.addonModules);
  const selectedAddonModule = addonModules.find(
    (module) => module.name === selectedExtensionNode?.addon
  );
  const hasProperty =
    !!selectedAddonModule?.api?.property?.properties &&
    Object.keys(selectedAddonModule?.api?.property?.properties).length > 0;

  return (
    <Sheet>
      <SheetTrigger
        className={cn(
          buttonVariants({ variant: "outline", size: "icon" }),
          "bg-transparent"
        )}
      >
        <SettingsIcon />
      </SheetTrigger>
      <SheetContent className="w-[400px] overflow-y-auto sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>属性设置</SheetTitle>
          <SheetDescription>
            在此调整所选图谱的扩展属性，保存后会写入 property.json。
          </SheetDescription>
        </SheetHeader>

        <div className="my-4">
          <Label>扩展</Label>
          <Select
            onValueChange={setSelectedExtension}
            value={selectedExtension}
          >
            <SelectTrigger className="mt-2 w-full">
              <SelectValue placeholder="选择扩展" />
            </SelectTrigger>
            <SelectContent>
              {selectedGraph
                ? selectedGraph.nodes.map((node) => (
                    <SelectItem key={node.name} value={node.name}>
                      {node.name}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </Select>
        </div>

        {hasProperty ? (
          selectedExtensionNode?.["property"] && (
            <GraphCfgForm
              selectedAddonModule={selectedAddonModule}
              selectedExtension={selectedExtension}
              key={`${graphName}-${selectedExtension}`}
              initialData={selectedExtensionNode?.["property"] || {}}
              metadata={
                addonModules.find(
                  (module) => module.name === selectedExtensionNode?.addon
                )?.api?.property?.properties || {}
              }
              onUpdate={async (data) => {
                // clone the overridenProperties
                const selectedGraphCopy: Graph = JSON.parse(
                  JSON.stringify(selectedGraph)
                );
                const nodes = selectedGraphCopy?.nodes || [];
                let needUpdate = false;
                for (const node of nodes) {
                  if (node.name === selectedExtension) {
                    node.property = data;
                    needUpdate = true;
                  }
                }
                if (needUpdate) {
                  await updateGraph(selectedGraph, selectedGraphCopy);
                  toast.success("属性已更新", {
                    description: `图谱: ${graphName}，扩展: ${selectedExtension}`,
                  });
                }
              }}
            />
          )
        ) : (
          <SheetDescription>
            所选扩展没有可配置的属性。
          </SheetDescription>
        )}
      </SheetContent>
    </Sheet>
  );
}

export function RemotePropertyAddCfgSheet({
  selectedExtension,
  extensionNodeData,
  onUpdate,
}: {
  selectedExtension: string;
  extensionNodeData: Record<string, string | number | boolean | null>;
  onUpdate: (data: string) => void;
}) {
  const dispatch = useAppDispatch();
  const { selectedGraph } = useGraphs();

  const selectedExtensionNode = selectedGraph?.nodes.find(
    (n) => n.name === selectedExtension
  );
  const addonModules = useAppSelector((state) => state.global.addonModules);
  const selectedAddonModule = addonModules.find(
    (module) => module.name === selectedExtensionNode?.addon
  );
  const allProperties = Object.keys(
    selectedAddonModule?.api?.property?.properties || {}
  );
  const usedProperties = Object.keys(extensionNodeData);
  const remainingProperties = allProperties.filter(
    (prop) => !usedProperties.includes(prop)
  );
  const hasRemainingProperties = remainingProperties.length > 0;

  const [selectedProperty, setSelectedProperty] = React.useState<string>("");
  const [isSheetOpen, setSheetOpen] = React.useState(false); // State to control the sheet

  return (
    <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
      <SheetTrigger asChild>
        <div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setSheetOpen(true);
            }}
          >
            添加
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[400px] overflow-y-auto sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>添加属性</SheetTitle>
          <SheetDescription>
            为图谱扩展节点新增属性并配置其值。
          </SheetDescription>
        </SheetHeader>
        {hasRemainingProperties ? (
          <>
            <Select
              onValueChange={(key) => {
                setSelectedProperty(key);
              }}
              value={selectedProperty}
            >
              <SelectTrigger className="my-4 w-full">
                <SelectValue placeholder="选择属性" />
              </SelectTrigger>
              <SelectContent>
                {remainingProperties.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              type="submit"
              onClick={() => {
                setSheetOpen(false);
                if (selectedProperty !== "") {
                  onUpdate(selectedProperty);
                  setSelectedProperty("");
                }
              }}
            >
              添加
            </Button>
          </>
        ) : (
          <>
            <SheetDescription className="my-4">
              没有可添加的属性。
            </SheetDescription>
            <Button
              type="submit"
              onClick={() => {
                setSheetOpen(false);
              }}
            >
              确定
            </Button>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

// Helper to convert values based on type
const convertToType = (value: any, type: string) => {
  switch (type) {
    case "int64":
    case "int32":
      return parseInt(value, 10);
    case "float64":
    case "float32":
      return parseFloat(value);
    case "bool":
      return value === true || value === "true";
    case "string":
      return String(value);
    default:
      return value;
  }
};

const defaultTypeValue = (type: string) => {
  switch (type) {
    case "int64":
    case "int32":
      return 0;
    case "float64":
      return 0.1;
    case "bool":
      return false;
    case "string":
    default:
      return "";
  }
};

import { useState } from "react";

const GraphCfgForm = ({
  selectedExtension,
  selectedAddonModule,
  initialData,
  metadata,
  onUpdate,
}: {
  selectedExtension: string;
  selectedAddonModule: AddonDef.Module | undefined;
  initialData: Record<string, string | number | boolean | null>;
  metadata: Record<string, { type: string }>;
  onUpdate: (data: Record<string, string | number | boolean | null>) => void;
}) => {
  const formSchema = z.record(
    z.string(),
    z.union([z.string(), z.number(), z.boolean(), z.null()])
  );

  const [formData, setFormData] = useState(initialData);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const convertedData = Object.entries(data).reduce(
      (acc, [key, value]) => {
        const type = metadata[key]?.type || "string";
        acc[key] =
          value === "" ? defaultTypeValue(type) : convertToType(value, type);
        return acc;
      },
      {} as Record<string, string | number | boolean | null>
    );
    onUpdate(convertedData);
  };

  const handleDelete = (key: string) => {
    const updatedData = { ...formData };
    delete updatedData[key]; // Remove the specific key
    setFormData(updatedData); // Update state
    form.reset(updatedData); // Reset the form
  };

  const initialDataWithType = Object.entries(formData).reduce(
    (acc, [key, value]) => {
      acc[key] = { value, type: metadata[key]?.type || "string" };
      return acc;
    },
    {} as Record<
      string,
      { value: string | number | boolean | null; type: string }
    >
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {Object.entries(initialDataWithType).map(([key, { value, type }]) => (
          <FormField
            key={key}
            control={form.control}
            name={key}
            render={({ field }) => (
              <FormItem>
                <FormLabel>{key}</FormLabel>
                <div className="flex items-center justify-between">
                  <FormControl>
                    {type === "bool" ? (
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={field.value === true}
                          onCheckedChange={field.onChange}
                        />
                      </div>
                    ) : (
                      <Input
                        {...field}
                        value={
                          field.value === null || field.value === undefined
                            ? ""
                            : field.value.toString()
                        }
                        type={type === "string" ? "text" : "number"}
                      />
                    )}
                  </FormControl>
                  <div
                    className={cn(
                      buttonVariants({ variant: "outline", size: "icon" }),
                      "bg-transparent",
                      "ml-2",
                      "cursor-pointer"
                    )}
                    onClick={() => handleDelete(key)} // Delete action
                  >
                    <Trash2Icon />
                  </div>
                </div>
              </FormItem>
            )}
          />
        ))}
        <div className="flex">
          <RemotePropertyAddCfgSheet
            selectedExtension={selectedExtension}
            extensionNodeData={formData}
            onUpdate={(key: string) => {
              const defaultProperty =
                selectedAddonModule?.defaultProperty || {};
              let defaultValue = defaultProperty[key];

              if (defaultValue === undefined) {
                const schema =
                  selectedAddonModule?.api?.property?.properties || {};
                const schemaType = schema[key]?.type;
                if (schemaType === "bool") {
                  defaultValue = false;
                }
              }
              const updatedData = { ...formData };
              updatedData[key] = defaultValue;
              setFormData(updatedData);
              form.reset(updatedData);
            }}
          />
          <Button
            className="mx-2"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <>
                <LoaderCircleIcon className="h-4 w-4 animate-spin" />
                <span>保存中...</span>
              </>
            ) : (
              "保存更改"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
