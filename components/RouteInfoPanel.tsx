"use client";

import type { Route, University } from "@/lib/types";

type RouteInfoPanelProps = {
  university: University | null;
};

function formatStops(route: Route) {
  if (route.stops.length <= 4) {
    return route.stops.join(" → ");
  }

  return `${route.stops.slice(0, 3).join(" → ")} → +${
    route.stops.length - 3
  } more`;
}

function RouteRow({ route, index }: { route: Route; index: number }) {
  return (
    <article
      className="animate-route-card border-b border-slate-100 py-3 last:border-b-0"
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <h3
          className="min-w-0 flex-1 truncate text-sm font-semibold"
          style={{ color: route.color }}
          title={route.name}
        >
          {route.name}
        </h3>
        <div className="flex flex-none flex-wrap justify-end gap-1">
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
            {route.days}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600">
            {route.hours}
          </span>
        </div>
      </div>

      <p className="mt-2 truncate text-xs leading-5 text-slate-500" title={route.stops.join(" → ")}>
        {formatStops(route)}
      </p>
    </article>
  );
}

export function RouteInfoPanel({ university }: RouteInfoPanelProps) {
  if (!university) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white/70 p-4 text-sm text-slate-400">
        Select a university to view routes.
      </div>
    );
  }

  return (
    <section className="animate-fade-in">
      <div className="mb-2 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <h2 className="truncate text-sm font-semibold text-slate-900">
            Route info
          </h2>
          <p className="text-xs text-slate-400">
            {university.routes.length} routes available
          </p>
        </div>
      </div>

      <div>
        {university.routes.map((route, index) => (
          <RouteRow
            key={`${university.id}-${route.name}`}
            route={route}
            index={index}
          />
        ))}
      </div>

      <a
        href={university.transitUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-flex min-h-10 items-center text-sm font-semibold text-fau-blue transition-all duration-200 hover:underline focus:outline-none focus:ring-2 focus:ring-fau-blue focus:ring-offset-2"
      >
        View full transit info →
      </a>
    </section>
  );
}
