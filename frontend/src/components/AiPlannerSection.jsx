function AiPlannerSection({
  aiPlan,
  aiQuery,
  loading,
  onPlanSubmit,
  onQueryChange,
}) {
  return (
    <section className="planner-section" id="planner">
      <div>
        <p className="eyebrow">AI trip planner</p>
        <h2>Ask for the journey you have in mind</h2>
        <p className="muted">Tell the assistant your dates, budget, style, and destination ideas.</p>
        <div className="planner-prompts">
          <button type="button" onClick={() => onQueryChange("Plan 5 days in Japan with temples, food, trains, and a moderate budget")}>Japan food trip</button>
          <button type="button" onClick={() => onQueryChange("Plan 7 days in Italy for a couple with history, coast, and great restaurants")}>Italy couple route</button>
          <button type="button" onClick={() => onQueryChange("Plan 4 days in Dubai with adventure, shopping, desert safari, and luxury hotels")}>Dubai adventure</button>
        </div>
      </div>
      <form onSubmit={onPlanSubmit}>
        <textarea
          value={aiQuery}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Plan 6 days in Italy for two people with food, trains, history, and a moderate budget"
          required
        />
        <button disabled={loading}>Generate AI Plan</button>
      </form>
      {aiPlan && (
        <div className="ai-plan-card">
          <p className="eyebrow">Generated plan</p>
          <pre className="ai-plan">{aiPlan}</pre>
        </div>
      )}
    </section>
  );
}

export default AiPlannerSection;
