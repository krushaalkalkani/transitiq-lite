export type TransitResponse = {
  directAnswer: string;
  extractedInfo: string[];
  explanation: string;
  assumptions: string;
  suggestedAction: string;
  sources: string[];
};

export type Route = {
  name: string;
  stops: string[];
  days: string;
  hours: string;
  color: string;
};

export type University = {
  id: string;
  name: string;
  city: string;
  state: string;
  transitSystemName: string;
  transitUrl: string;
  routes: Route[];
};
