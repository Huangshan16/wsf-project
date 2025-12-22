"use client";

import * as React from "react";
import { toast } from "sonner";
import {
  apiPing,
  apiStartService,
  apiStopService,
  EMobileActiveTab,
  isEditModeOn,
  MOBILE_ACTIVE_TAB_MAP,
  useAppDispatch,
  useAppSelector,
} from "@/common";
import { LoadingButton } from "@/components/Button/LoadingButton";
import { RemoteGraphSelect } from "@/components/Chat/ChatCfgGraphSelect";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { setAgentConnected, setMobileActiveTab } from "@/store/reducers/global";
import { TrulienceCfgSheet } from "../Chat/ChatCfgTrulienceSetting";

let intervalId: NodeJS.Timeout | null = null;

export default function Action(props: { className?: string }) {
  const { className } = props;
  const dispatch = useAppDispatch();
  const agentConnected = useAppSelector((state) => state.global.agentConnected);
  const channel = useAppSelector((state) => state.global.options.channel);
  const userId = useAppSelector((state) => state.global.options.userId);
  const language = useAppSelector((state) => state.global.language);
  const voiceType = useAppSelector((state) => state.global.voiceType);
  const selectedGraphId = useAppSelector(
    (state) => state.global.selectedGraphId
  );
  const graphList = useAppSelector((state) => state.global.graphList);
  const mobileActiveTab = useAppSelector(
    (state) => state.global.mobileActiveTab
  );
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (channel) {
      checkAgentConnected();
    }
  }, [channel]);

  const checkAgentConnected = async () => {
    const res: any = await apiPing(channel);
    if (res?.code == 0) {
      dispatch(setAgentConnected(true));
    }
  };

  const onClickConnect = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    if (agentConnected) {
      await apiStopService(channel);
      dispatch(setAgentConnected(false));
      toast.success("已断开晓佑");
      stopPing();
    } else {
      const selectedGraph = graphList.find(
        (graph) => graph.graph_id === selectedGraphId
      );
      if (!selectedGraph) {
        toast.error("请先选择一个图谱");
        setLoading(false);
        return;
      }

      const res = await apiStartService({
        channel,
        userId,
        graphName: selectedGraph.name,
        language,
        voiceType,
      });
      const { code, msg } = res || {};
      if (code != 0) {
        if (code == "10001") {
          toast.error(
            "当前同时在线体验人数已达上限，请稍后再试。"
          );
        } else {
          toast.error(`错误码:${code}，信息:${msg}`);
        }
        setLoading(false);
        throw new Error(msg);
      }
      dispatch(setAgentConnected(true));
      toast.success("晓佑已连接");
      startPing();
    }
    setLoading(false);
  };

  const startPing = () => {
    if (intervalId) {
      stopPing();
    }
    intervalId = setInterval(() => {
      apiPing(channel);
    }, 3000);
  };

  const stopPing = () => {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  };

  const onChangeMobileActiveTab = (tab: string) => {
    dispatch(setMobileActiveTab(tab as EMobileActiveTab));
  };

  return (
    <>
      {/* Action Bar */}
      <div
        className={cn(
          "mx-2 mt-2 flex items-center justify-between rounded-t-lg bg-[#e8daca] p-2 md:m-2 md:rounded-lg",
          className
        )}
      >
        {/* -- Description Part */}
        <div className="hidden md:block">
          <span className="font-bold text-sm">角色设定</span>
          <span className="ml-2 whitespace-nowrap text-muted-foreground text-xs">
            一位基于尖端人工智能与深度学习技术打造的居家智能陪护助手。不是替代人类情感连接，而是提供补充性的支持、信息与温和陪伴。
          </span>
        </div>

        <div className="flex w-full flex-col justify-between md:flex-row md:items-center md:justify-end">
          {/* -- Tabs Section */}
          <Tabs
            defaultValue={mobileActiveTab}
            className="w-full md:hidden md:flex-row"
            onValueChange={onChangeMobileActiveTab}
          >
            <TabsList className="flex justify-center md:justify-start">
              {Object.values(EMobileActiveTab).map((tab) => (
                <TabsTrigger key={tab} value={tab} className="w-24 text-sm">
                  {MOBILE_ACTIVE_TAB_MAP[tab]}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* -- Graph Select Part */}
          <div className="mt-2 flex w-full items-center justify-between gap-2 md:mt-0 md:w-auto md:flex-wrap">
            <RemoteGraphSelect />
            {isEditModeOn && (
              <>
                <TrulienceCfgSheet />
                {/* <RemoteModuleCfgSheet /> */}
                {/* <RemotePropertyCfgSheet /> */}
              </>
            )}

            {/* -- Action Button */}
            <div className="flex items-center gap-2 md:ml-auto">
              <LoadingButton
                onClick={onClickConnect}
                variant={!agentConnected ? "default" : "destructive"}
                size="sm"
                disabled={!selectedGraphId && !agentConnected}
                className="w-fit min-w-24 shrink-0"
                loading={loading}
                svgProps={{ className: "h-4 w-4 text-muted-foreground" }}
              >
                {loading
                  ? "连接中"
                  : !agentConnected
                    ? "连接"
                    : "断开"}
              </LoadingButton>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
