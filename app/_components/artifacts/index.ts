import type { ArtifactType } from "@/data/examples";
import { EmailDigest } from "./EmailDigest";
import { InboxMock } from "./InboxMock";
import { ReportMock } from "./ReportMock";
import { SlackMessage } from "./SlackMessage";
import { SlideThumbs } from "./SlideThumbs";
import { VideoFrame } from "./VideoFrame";

export { EmailDigest, InboxMock, ReportMock, SlackMessage, SlideThumbs, VideoFrame };

export const artifactComponents: Record<ArtifactType, React.ComponentType> = {
  "email-digest": EmailDigest,
  "report-mock": ReportMock,
  "slide-thumbs": SlideThumbs,
  "inbox-mock": InboxMock,
  "video-frame": VideoFrame,
  "slack-message": SlackMessage,
};
