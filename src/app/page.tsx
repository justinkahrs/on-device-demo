"use client";

import { useMemo, useState } from "react";
import { MockMobileDevice } from "../lib";
import { scenarios } from "../playground/scenarios";
import styles from "./page.module.css";

export default function PlaygroundPage() {
  const [scenarioId, setScenarioId] = useState(scenarios[0].id);
  const [messageDelayMs, setMessageDelayMs] = useState(950);
  const [autoStart, setAutoStart] = useState(true);
  const [resumeOnTap, setResumeOnTap] = useState(true);
  const [demoName, setDemoName] = useState("RCS Tech Demo");
  const [headerSubtitle, setHeaderSubtitle] = useState("Verified Business");
  const [logoSrc, setLogoSrc] = useState("");
  const [bannerColor, setBannerColor] = useState("#aaaaaa");
  const [sessionSeed, setSessionSeed] = useState(0);

  const activeScenario = useMemo(() => {
    return scenarios.find((scenario) => scenario.id === scenarioId) ?? scenarios[0];
  }, [scenarioId]);

  const replayScenario = () => {
    setSessionSeed((value) => value + 1);
  };

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <div>
          <h1>{demoName || "RCS Tech Demo"} Playground</h1>
          <p>
            Interactive sandbox for <code>MockMobileDevice</code> with real script
            branching.
          </p>
        </div>
      </section>

      <section className={styles.content}>
        <aside className={styles.controls}>
          <div className={styles.field}>
            <label htmlFor="scenario">Scenario</label>
            <select
              id="scenario"
              value={scenarioId}
              onChange={(event) => {
                setScenarioId(event.target.value);
                replayScenario();
              }}
            >
              {scenarios.map((scenario) => (
                <option key={scenario.id} value={scenario.id}>
                  {scenario.name}
                </option>
              ))}
            </select>
            <p>{activeScenario.description}</p>
          </div>

          <div className={styles.field}>
            <label htmlFor="delay">Message delay ({messageDelayMs}ms)</label>
            <input
              id="delay"
              type="range"
              min={250}
              max={2200}
              step={50}
              value={messageDelayMs}
              onChange={(event) => {
                setMessageDelayMs(Number(event.target.value));
              }}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="title">Demo name</label>
            <input
              id="title"
              value={demoName}
              onChange={(event) => {
                setDemoName(event.target.value);
              }}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="subtitle">Header subtitle</label>
            <input
              id="subtitle"
              value={headerSubtitle}
              onChange={(event) => {
                setHeaderSubtitle(event.target.value);
              }}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="logo-url">Logo URL</label>
            <input
              id="logo-url"
              placeholder="https://example.com/logo.png or /logo.png"
              value={logoSrc}
              onChange={(event) => {
                setLogoSrc(event.target.value);
              }}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="banner-color">Header banner color</label>
            <input
              id="banner-color"
              type="color"
              value={bannerColor}
              onChange={(event) => {
                setBannerColor(event.target.value);
              }}
            />
          </div>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={autoStart}
              onChange={(event) => {
                setAutoStart(event.target.checked);
              }}
            />
            Auto-start playback
          </label>

          <label className={styles.checkbox}>
            <input
              type="checkbox"
              checked={resumeOnTap}
              onChange={(event) => {
                setResumeOnTap(event.target.checked);
              }}
            />
            Tap chat to resume
          </label>

          <button className={styles.button} type="button" onClick={replayScenario}>
            Replay Scenario
          </button>

          <div className={styles.field}>
            <label>Branch paths in this scenario</label>
            <ul className={styles.branchList}>
              {activeScenario.branches.map((branch) => (
                <li key={branch}>{branch}</li>
              ))}
            </ul>
          </div>
        </aside>

        <div className={styles.preview}>
          <MockMobileDevice
            key={`${activeScenario.id}-${sessionSeed}`}
            script={activeScenario.script}
            autoStart={autoStart}
            resumeOnTap={resumeOnTap}
            messageDelayMs={messageDelayMs}
            headerProps={{
              title: demoName || "RCS Tech Demo",
              subtitle: headerSubtitle || "Verified Business",
              logoSrc: logoSrc || undefined,
              bannerColor,
            }}
          />
        </div>
      </section>
    </main>
  );
}
