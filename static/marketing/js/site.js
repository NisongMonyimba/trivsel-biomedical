(() => {
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });
  }

  const searchPanel = document.querySelector("[data-search-panel]");
  const searchOpen = document.querySelector("[data-search-open]");
  const searchClose = document.querySelector("[data-search-close]");
  const searchInput = document.querySelector("[data-site-search]");
  const results = document.querySelector("[data-search-results]");

  const index = [
    ["Regulatory intelligence", "/regulatory", "regulatory intelligence education compliance science research"],
    ["Institutional governance", "/governance", "institutional governance education compliance science research"],
    ["Scientific research programs", "/research/programs", "scientific research programs education compliance science research"],
    ["Simulation laboratory", "/research/simulations", "simulation laboratory education compliance science research"],
    ["Research library", "/research/library", "research library education compliance science research"],

    ["Asset identity", "/platform/asset-identity", "asset identity persistent asset id qr asset tag manufacturer model serial location department placement traceability lifecycle maintenance calibration faults"],
    ["Maintenance", "/platform/maintenance", "maintenance preventive corrective service repair intervention work order asset history lifecycle technician engineer planned due completed faults"],
    ["Calibration", "/platform/calibration", "calibration due state evidence certificate measurement metrology status traceability asset readiness quality laboratory instrument"],
    ["Platform", "/platform", "asset identity maintenance calibration faults readiness lifecycle"],
    ["Industries", "/industries", "healthcare manufacturing laboratories facilities infrastructure ports hospitality"],
    ["Intelligence", "/intelligence", "asset graph operational intelligence readiness human machine responsible ai"],
    ["Research", "/research", "asset intelligence reliability healthcare engineering applied ai measurement evidence"],
    ["Company", "/company", "mission principles people Trivsel"],
    ["Careers", "/careers", "software engineering design reliability quality security research"],
    ["Contact", "/contact", "pilot product support research contact"],
    ["Trust Center", "/trust", "hospital assurance security privacy standards pilot scope HIPAA PIPEDA"],
    ["Privacy notice", "/privacy", "website email inquiry personal information rights privacy"],
    ["Knowledge Center", "/knowledge", "knowledge center equipment management readiness"],
    ["Body of Knowledge", "/knowledge/body-of-knowledge", "body of knowledge equipment management readiness"],
    ["Encyclopedia", "/knowledge/encyclopedia", "encyclopedia equipment management readiness"],
    ["Glossary", "/knowledge/glossary", "glossary equipment management readiness"],
    ["Standards", "/standards", "standards equipment management readiness"],
    ["Academy", "/academy", "academy equipment management readiness"],
    ["Courses", "/academy/courses", "courses equipment management readiness"],
    ["Qualifications", "/academy/qualifications", "qualifications equipment management readiness"],
    ["Universities", "/universities", "universities equipment management readiness"],
    ["Publications", "/research/publications", "publications equipment management readiness"],
    ["Research opportunities", "/research/opportunities", "research opportunities equipment management readiness"],
    ["Partnerships", "/partnerships", "partnerships equipment management readiness"],
    ["Community", "/community", "community equipment management readiness"],
    ["Tools", "/tools", "tools equipment management readiness"],
    ["Templates", "/tools/templates", "templates equipment management readiness"],
    ["Observatory", "/benchmarking", "observatory equipment management readiness"],
    ["Events", "/events", "events equipment management readiness"],
    ["What is equipment management?", "/knowledge/equipment-management", "what is equipment management? equipment management readiness"],
    ["What is asset management?", "/knowledge/asset-management", "what is asset management? equipment management readiness"],
    ["What is medical equipment management?", "/knowledge/medical-equipment-management", "what is medical equipment management? equipment management readiness"],
    ["What is equipment readiness?", "/knowledge/equipment-readiness", "what is equipment readiness? equipment management readiness"],
    ["Equipment readiness versus equipment availability", "/knowledge/readiness-vs-availability", "equipment readiness versus equipment availability equipment management readiness"],
    ["Equipment maintenance versus calibration", "/knowledge/maintenance-vs-calibration", "equipment maintenance versus calibration equipment management readiness"],
    ["How to create a hospital equipment inventory", "/knowledge/hospital-equipment-inventory", "how to create a hospital equipment inventory equipment management readiness"],
    ["How to develop a medical equipment maintenance program", "/knowledge/maintenance-program", "how to develop a medical equipment maintenance program equipment management readiness"],
    ["How to calculate equipment downtime", "/knowledge/equipment-downtime", "how to calculate equipment downtime equipment management readiness"],
    ["How to calculate mean time between failures", "/knowledge/mtbf", "how to calculate mean time between failures equipment management readiness"],
    ["How to calculate mean time to repair", "/knowledge/mttr", "how to calculate mean time to repair equipment management readiness"],
    ["How to calculate equipment availability", "/knowledge/availability", "how to calculate equipment availability equipment management readiness"],
    ["How to calculate preventive maintenance compliance", "/knowledge/pm-compliance", "how to calculate preventive maintenance compliance equipment management readiness"],
    ["What is operational leakage?", "/knowledge/operational-leakage", "what is operational leakage? equipment management readiness"],
    ["How to measure hospital equipment performance", "/knowledge/hospital-performance", "how to measure hospital equipment performance equipment management readiness"],
    ["What is an equipment lifecycle?", "/knowledge/equipment-lifecycle", "what is an equipment lifecycle? equipment management readiness"],
    ["What is an equipment asset register?", "/knowledge/asset-register", "what is an equipment asset register? equipment management readiness"],
    ["What is a CMMS?", "/knowledge/cmms", "what is a cmms? equipment management readiness"],
    ["CMMS versus EAM versus healthcare equipment management", "/knowledge/cmms-eam", "cmms versus eam versus healthcare equipment management equipment management readiness"],
    ["How to develop an equipment management policy", "/knowledge/equipment-policy", "how to develop an equipment management policy equipment management readiness"],
    ["Introduction to ISO 55001", "/knowledge/iso-55001", "introduction to iso 55001 equipment management readiness"],
    ["Introduction to ANSI/AAMI EQ56", "/knowledge/aami-eq56", "introduction to ansi/aami eq56 equipment management readiness"],
    ["What does a biomedical equipment technician do?", "/knowledge/biomedical-technician", "what does a biomedical equipment technician do? equipment management readiness"],
    ["How to become a healthcare technology manager", "/knowledge/healthcare-technology-manager", "how to become a healthcare technology manager equipment management readiness"],
    ["Artificial intelligence in equipment management", "/knowledge/ai-equipment-management", "artificial intelligence in equipment management equipment management readiness"],
    ["Artificial Intelligence for Physical Asset Systems", "/academy/courses/ai-physical-assets", "artificial intelligence for physical asset systems frame a prediction problem, design a defensible evaluation, inspect limitations and preserve human authority."],
    ["Digital Asset Management", "/academy/courses/digital-asset-management", "digital asset management create controlled equipment identities, trace lifecycle events and design data-minimizing workflows."],
    ["Fundamentals of Equipment Readiness", "/academy/courses/equipment-readiness", "fundamentals of equipment readiness distinguish functioning, availability and readiness; define task prerequisites; document evidence gaps."],
    ["Maintenance and Calibration Management", "/academy/courses/maintenance-calibration", "maintenance and calibration management distinguish task types, plan evidence and analyze due-date performance without authorizing technical service."],
    ["Equipment Reliability and Performance Indicators", "/academy/courses/reliability-performance", "equipment reliability and performance indicators compute exposure-based indicators, distinguish repair from restoration, interpret incomplete observations."],
    ["Equipment readiness benchmarking methodology", "/benchmarking/methodology", "equipment readiness benchmarking methodology define comparable indicators before calculating or comparing equipment performance."],
    ["Global Equipment Readiness Report protocol", "/benchmarking/report-protocol", "global equipment readiness report protocol a proposed annual publication structure. no global survey or report result is claimed."],
    ["Equipment management professional development", "/careers/professional-development", "equipment management professional development career and skills pathways for students, technicians, engineers, managers and researchers."],
    ["Professional competency framework", "/community/competencies", "professional competency framework proposed knowledge, practice, evidence and ethics expectations for equipment professionals."],
    ["Educational webinar and event program", "/events/webinar-library", "educational webinar and event program proposed learning sessions and available reading-based preparation."],
    ["Acceptance and commissioning of healthcare equipment", "/knowledge/acceptance-and-commissioning", "acceptance and commissioning of healthcare equipment acceptance determines whether supplied equipment meets agreed requirements; commissioning prepares it for authorized use in its environment."],
    ["Equipment criticality classification", "/knowledge/asset-criticality", "equipment criticality classification criticality describes the consequences of losing an asset function within an operating context."],
    ["Designing an asset hierarchy", "/knowledge/asset-hierarchy", "designing an asset hierarchy an asset hierarchy expresses the relationship between sites, systems, equipment and maintainable components without replacing stable asset identities."],
    ["Using an equipment inventory template", "/knowledge/asset-inventory-template", "using an equipment inventory template an inventory template provides a starting structure for consistent equipment identity and context."],
    ["Developing an asset management career pathway", "/knowledge/asset-management-career", "developing an asset management career pathway asset management connects lifecycle decisions, engineering, governance, finance and organizational objectives."],
    ["Measuring repair backlog age", "/knowledge/backlog-aging", "measuring repair backlog age backlog age describes elapsed time since the defined opening event for work still unresolved at a cutoff."],
    ["Domain 01: Asset management fundamentals", "/knowledge/body-of-knowledge/domain-01", "domain 01: asset management fundamentals define function, value, lifecycle boundaries and decision authority; distinguish asset strategy from maintenance execution."],
    ["Domain 02: Equipment identification and classification", "/knowledge/body-of-knowledge/domain-02", "domain 02: equipment identification and classification separate permanent ids from class, model, serial and mutable location; implement controlled terms and duplicate review."],
    ["Domain 03: Equipment procurement and acquisition", "/knowledge/body-of-knowledge/domain-03", "domain 03: equipment procurement and acquisition translate needs into functional requirements, compare supportability, lifecycle costs and evidence, document approvals."],
    ["Domain 04: Registration and commissioning", "/knowledge/body-of-knowledge/domain-04", "domain 04: registration and commissioning verify identity, evidence and installation prerequisites; document open exceptions and authorized disposition."],
    ["Domain 05: Asset lifecycle management", "/knowledge/body-of-knowledge/domain-05", "domain 05: asset lifecycle management plan acquisition, operation, service, reassignment and retirement; preserve events and accountable handoffs."],
    ["Domain 06: Equipment condition and operational status", "/knowledge/body-of-knowledge/domain-06", "domain 06: equipment condition and operational status define observable states, transition evidence and temporal context; distinguish unknown from operational."],
    ["Domain 07: Preventive maintenance", "/knowledge/body-of-knowledge/domain-07", "domain 07: preventive maintenance translate approved task requirements into due schedules, resources, evidence and follow-up."],
    ["Domain 08: Corrective maintenance", "/knowledge/body-of-knowledge/domain-08", "domain 08: corrective maintenance manage fault intake, intervention, verification and restoration; investigate recurring failures."],
    ["Domain 09: Predictive maintenance", "/knowledge/body-of-knowledge/domain-09", "domain 09: predictive maintenance use appropriately validated condition observations and forecast uncertainty to support authorized maintenance."],
    ["Domain 10: Calibration and metrology", "/knowledge/body-of-knowledge/domain-10", "domain 10: calibration and metrology distinguish indication error, uncertainty, traceability and conformity; preserve certificates and due-date rules."],
    ["Domain 11: Equipment reliability engineering", "/knowledge/body-of-knowledge/domain-11", "domain 11: equipment reliability engineering define failures and exposure, handle censoring, assess dependencies and quantify uncertainty."],
    ["Domain 12: Equipment availability and readiness", "/knowledge/body-of-knowledge/domain-12", "domain 12: equipment availability and readiness choose time denominator, track interruptions and separately evaluate task-specific readiness evidence."],
    ["Domain 13: Risk management and safety", "/knowledge/body-of-knowledge/domain-13", "domain 13: risk management and safety identify credible scenarios and existing controls; retain residual risk decisions with authorized roles."],
    ["Domain 14: Fault reporting and response", "/knowledge/body-of-knowledge/domain-14", "domain 14: fault reporting and response define report, acknowledgement, first response, repair and restoration timestamps consistently."],
    ["Domain 15: Operational leakage", "/knowledge/body-of-knowledge/domain-15", "domain 15: operational leakage distinguish downtime, response delay, backlog, recurrence, overdue maintenance and overdue calibration; avoid double counting overlapping losses."],
    ["Domain 16: Equipment utilization", "/knowledge/body-of-knowledge/domain-16", "domain 16: equipment utilization define demand, usage, capacity and eligible time windows; distinguish standby and unavailable state."],
    ["Domain 17: Asset economics and lifecycle costing", "/knowledge/body-of-knowledge/domain-17", "domain 17: asset economics and lifecycle costing compare acquisition, operation, service and disposal costs on a common basis; account for uncertainty and time value as appropriate."],
    ["Domain 18: Quality management", "/knowledge/body-of-knowledge/domain-18", "domain 18: quality management establish document control, process evidence, corrective action and effectiveness verification."],
    ["Domain 19: Regulatory compliance", "/knowledge/body-of-knowledge/domain-19", "domain 19: regulatory compliance distinguish laws, contracts, guidance and voluntary standards; map scope and traceable evidence; seek authorization."],
    ["Domain 20: Digital asset management", "/knowledge/body-of-knowledge/domain-20", "domain 20: digital asset management design information workflows that preserve identity, ownership and lifecycle events; assess software fit and interoperability."],
    ["Domain 21: Asset data governance", "/knowledge/body-of-knowledge/domain-21", "domain 21: asset data governance define purpose, minimization, access, provenance, retention and lawful secondary use; preserve controls across systems."],
    ["Domain 22: Asset ontology and knowledge graphs", "/knowledge/body-of-knowledge/domain-22", "domain 22: asset ontology and knowledge graphs model persistent entities, relations, time and provenance; distinguish classes, instances and events."],
    ["Domain 23: Artificial intelligence for physical assets", "/knowledge/body-of-knowledge/domain-23", "domain 23: artificial intelligence for physical assets frame prediction targets, evaluate data and uncertainty, avoid leakage, test model behavior and require human oversight."],
    ["Domain 24: Organizational leadership and competency", "/knowledge/body-of-knowledge/domain-24", "domain 24: organizational leadership and competency define role boundaries, competence evidence, leadership accountability and learning needs."],
    ["Domain 25: Decommissioning and sustainability", "/knowledge/body-of-knowledge/domain-25", "domain 25: decommissioning and sustainability plan withdrawal, record disposition, assess information removal, environmental and legal constraints and preserve necessary history."],
    ["Equipment management continuity planning", "/knowledge/business-continuity", "equipment management continuity planning continuity planning identifies how essential equipment-related processes can operate during disruptions."],
    ["Reviewing calibration certificate information", "/knowledge/calibration-certificate-review", "reviewing calibration certificate information a certificate review checks whether reported information supports the intended measurement decision."],
    ["Calculating calibration compliance", "/knowledge/calibration-compliance", "calculating calibration compliance on-time calibration compliance counts eligible tasks completed by their deadline relative to eligible tasks due."],
    ["Calibration fundamentals", "/knowledge/calibration-fundamentals", "calibration fundamentals calibration establishes a relationship between reference quantity values and instrument indications under stated conditions."],
    ["Reviewing calibration intervals", "/knowledge/calibration-intervals", "reviewing calibration intervals calibration intervals should be established and reviewed using justified requirements and evidence of measurement performance."],
    ["Evaluating a calibration laboratory scope", "/knowledge/calibration-laboratory-scope", "evaluating a calibration laboratory scope laboratory competence evidence must be considered in relation to the specific measurement service required."],
    ["Measuring overdue calibration", "/knowledge/calibration-overdue", "measuring overdue calibration overdue calibration counts eligible calibration actions whose deadline has passed and completion remains outstanding."],
    ["Structuring calibration records", "/knowledge/calibration-records", "structuring calibration records a useful calibration record links equipment identity, measurement evidence and independently defined status."],
    ["Calibration versus verification", "/knowledge/calibration-vs-verification", "calibration versus verification calibration establishes a measurement relationship; verification evaluates evidence against stated requirements."],
    ["Building a compliance evidence register", "/knowledge/compliance-evidence-register", "building a compliance evidence register a compliance register traces requirements to owners, applicability decisions, controls and current evidence."],
    ["Introduction to condition-based maintenance", "/knowledge/condition-based-maintenance", "introduction to condition-based maintenance condition-based maintenance uses observed condition information to decide when approved intervention is warranted."],
    ["Using an equipment data quality audit worksheet", "/knowledge/data-quality-audit-template", "using an equipment data quality audit worksheet a data quality worksheet measures whether records are sufficiently complete and consistent for a defined purpose."],
    ["Discover knowledge and technical answers", "/knowledge/discovery", "discover knowledge and technical answers local search and transparent reference discovery, without an ai service or tracking."],
    ["Validating an engineering calculator", "/knowledge/engineering-calculator-validation", "validating an engineering calculator a calculator should implement a stated formula with explicit assumptions and testable behavior."],
    ["Equipment incident and quarantine records", "/knowledge/equipment-incidents-and-quarantine", "equipment incident and quarantine records a quarantine record separates potentially unsuitable equipment from routine availability until authorized review."],
    ["Equipment pooling and temporary loans", "/knowledge/equipment-loans-and-pooling", "equipment pooling and temporary loans equipment pooling supports shared use through transparent custody and availability rules."],
    ["Building an equipment management learning portfolio", "/knowledge/equipment-management-portfolio", "building an equipment management learning portfolio a portfolio demonstrates reasoning, evidence handling and communication through appropriately authorized examples."],
    ["Equipment status transitions and evidence", "/knowledge/equipment-status-transitions", "equipment status transitions and evidence status transitions describe a change in recorded operational condition with time and supporting evidence."],
    ["Documenting equipment user training", "/knowledge/equipment-user-training", "documenting equipment user training training records support evidence of competence for specific authorized tasks."],
    ["Measuring equipment utilization", "/knowledge/equipment-utilization", "measuring equipment utilization utilization describes used time relative to a defined available or scheduled capacity denominator."],
    ["Defining an equipment failure", "/knowledge/failure-definition", "defining an equipment failure reliability analysis depends on consistently defining what constitutes loss of a required function."],
    ["Introduction to failure mode analysis", "/knowledge/failure-mode-analysis", "introduction to failure mode analysis failure mode analysis examines how a required function might fail and what effects follow."],
    ["Estimating an observed failure rate", "/knowledge/failure-rate", "estimating an observed failure rate an observed failure rate relates counted failures to a specified exposure denominator."],
    ["Managing hospital equipment location", "/knowledge/hospital-equipment-location", "managing hospital equipment location location records describe where equipment was last recorded and when, distinct from identity and ownership."],
    ["Reviewing a hospital equipment management program", "/knowledge/hospital-equipment-program-audit", "reviewing a hospital equipment management program a program review compares documented practices, actual records and responsible roles against defined obligations."],
    ["Hospital equipment replacement planning", "/knowledge/hospital-equipment-replacement", "hospital equipment replacement planning replacement planning considers lifecycle support, performance, risk, demand and economic alternatives."],
    ["Planning hospital equipment spare parts", "/knowledge/hospital-equipment-spares", "planning hospital equipment spare parts spare parts planning connects failure exposure, supplier lead time, compatibility and demand uncertainty."],
    ["Information security for asset management systems", "/knowledge/information-security-management", "information security for asset management systems equipment management information can be operationally sensitive even when patient data is excluded."],
    ["Editorial and knowledge governance", "/knowledge/knowledge-governance", "editorial and knowledge governance the development process for versioned, reviewable educational content."],
    ["International language resources", "/knowledge/languages", "international language resources a multilingual terminology starter and future translation governance."],
    ["Calculating undiscounted lifecycle cost", "/knowledge/lifecycle-cost-indicator", "calculating undiscounted lifecycle cost undiscounted lifecycle cost sums relevant outlays and subtracts residual value over a common study period."],
    ["Understanding a maintenance backlog", "/knowledge/maintenance-backlog", "understanding a maintenance backlog backlog represents identified work not yet completed under a defined inclusion rule."],
    ["Maintenance documentation and evidence quality", "/knowledge/maintenance-documentation", "maintenance documentation and evidence quality maintenance evidence should make it possible for authorized people to reconstruct work and its limitations."],
    ["In-house versus outsourced maintenance", "/knowledge/maintenance-outsourcing", "in-house versus outsourced maintenance service delivery models should be assessed against capability, availability, governance and lifecycle cost."],
    ["Measuring overdue maintenance", "/knowledge/maintenance-overdue", "measuring overdue maintenance overdue maintenance measures actions past their defined due dates that remain incomplete under a consistent eligibility rule."],
    ["Maintenance planning versus scheduling", "/knowledge/maintenance-planning-scheduling", "maintenance planning versus scheduling planning determines what work requires; scheduling assigns feasible time and resources."],
    ["Choosing a maintenance strategy", "/knowledge/maintenance-strategy", "choosing a maintenance strategy maintenance strategy matches an asset failure context to feasible interventions and approved service requirements."],
    ["Using an equipment management maturity assessment", "/knowledge/maturity-assessment", "using an equipment management maturity assessment a maturity assessment compares evidence of practices against a declared developmental rubric."],
    ["Understanding indication error", "/knowledge/measurement-error", "understanding indication error indication error is the difference between a recorded indication and a reference value for a defined comparison."],
    ["Introduction to measurement uncertainty", "/knowledge/measurement-uncertainty", "introduction to measurement uncertainty measurement uncertainty expresses dispersion attributed to a measured quantity under a defined measurement model."],
    ["Classifying medical equipment for asset records", "/knowledge/medical-equipment-classification", "classifying medical equipment for asset records a controlled taxonomy supports consistent grouping, not regulatory classification or clinical approval."],
    ["Planning medical equipment procurement", "/knowledge/medical-equipment-procurement", "planning medical equipment procurement procurement starts with a documented operational need, not a preferred model."],
    ["Building a medical equipment service history", "/knowledge/medical-equipment-service-history", "building a medical equipment service history service history preserves the interventions and evidence attached to an asset throughout its lifecycle."],
    ["Evaluating external equipment service providers", "/knowledge/medical-equipment-vendor-service", "evaluating external equipment service providers vendor selection includes capability, evidence, response expectations and confidentiality obligations."],
    ["Medical software intended-use assessment", "/knowledge/medical-software-intended-use", "medical software intended-use assessment intended use and actual functions are central inputs to assessing medical software regulatory scope."],
    ["Choosing meaningful KPI denominators", "/knowledge/metric-denominators", "choosing meaningful kpi denominators a denominator identifies the population or exposure to which a numerator relates."],
    ["Understanding metrological traceability", "/knowledge/metrological-traceability", "understanding metrological traceability traceability relates a measurement result to a reference through a documented calibration chain with uncertainty contributions."],
    ["Using an operational leakage worksheet", "/knowledge/operational-leakage-worksheet", "using an operational leakage worksheet an operational leakage worksheet connects operational losses to clearly defined intervals and causes."],
    ["Handling an out-of-tolerance finding", "/knowledge/out-of-tolerance", "handling an out-of-tolerance finding an out-of-tolerance finding can require evaluation of instrument use and affected prior results."],
    ["Reviewing equipment KPI dashboards", "/knowledge/performance-dashboard-review", "reviewing equipment kpi dashboards dashboards support decisions only when their definitions, data quality and context are explicit."],
    ["Using a preventive maintenance schedule template", "/knowledge/pm-schedule-template", "using a preventive maintenance schedule template a schedule template makes eligible tasks, due dates and responsible roles visible."],
    ["Privacy by design for equipment records", "/knowledge/privacy-by-design", "privacy by design for equipment records privacy by design limits personal information to justified purposes and embeds protections in workflows."],
    ["Quality management and equipment management", "/knowledge/quality-management-system", "quality management and equipment management quality management connects defined processes, evidence, responsibilities and continuous improvement."],
    ["Defining equipment readiness criteria", "/knowledge/readiness-criteria", "defining equipment readiness criteria readiness is assessed against explicit prerequisites for a defined task and context at a point in time."],
    ["Running an equipment readiness review", "/knowledge/readiness-review", "running an equipment readiness review a readiness review brings evidence and unresolved constraints together for authorized operational decisions."],
    ["Using a readiness evidence worksheet", "/knowledge/readiness-review-template", "using a readiness evidence worksheet a readiness worksheet presents prerequisite evidence and unknown or unmet conditions for review."],
    ["Equipment redundancy and service capacity", "/knowledge/redundancy-and-capacity", "equipment redundancy and service capacity redundancy can reduce the operational consequences of loss of one asset when remaining resources meet the required function."],
    ["Introduction to reliability block diagrams", "/knowledge/reliability-block-diagrams", "introduction to reliability block diagrams a reliability block diagram represents how component functions contribute to system success under explicit assumptions."],
    ["Assessing reliability data quality", "/knowledge/reliability-data-quality", "assessing reliability data quality reliable inference depends on accurate event, exposure and equipment population records."],
    ["Developing a reliability engineering learning pathway", "/knowledge/reliability-engineering-career", "developing a reliability engineering learning pathway reliability engineering combines failure mechanisms, statistics, engineering judgment and improvement methods."],
    ["Monitoring reliability improvement", "/knowledge/reliability-growth", "monitoring reliability improvement reliability improvement tracks changes in failure behavior after documented interventions."],
    ["Measuring repeat breakdowns", "/knowledge/repeat-breakdowns", "measuring repeat breakdowns repeat breakdowns describe recurring failures within a defined relationship and time window."],
    ["Using an equipment replacement worksheet", "/knowledge/replacement-planning-template", "using an equipment replacement worksheet a replacement worksheet compares alternatives using transparent assumptions and evidence."],
    ["Measuring fault response delay", "/knowledge/response-delay", "measuring fault response delay response delay measures elapsed time between a reported fault and the first defined response."],
    ["Equipment responsibility matrix", "/knowledge/responsibility-matrix", "equipment responsibility matrix a responsibility matrix identifies who performs, approves, provides advice and is informed about a lifecycle activity."],
    ["Understanding equipment restoration time", "/knowledge/restoration-time", "understanding equipment restoration time restoration time includes the elapsed interval from a defined interruption start to verified restoration."],
    ["Using an equipment risk assessment worksheet", "/knowledge/risk-worksheet", "using an equipment risk assessment worksheet a worksheet structures hazards, scenarios, consequences, controls and follow-up questions."],
    ["Root cause analysis for recurring equipment problems", "/knowledge/root-cause-analysis", "root cause analysis for recurring equipment problems root cause analysis seeks contributing mechanisms and systemic conditions rather than accepting the first plausible explanation."],
    ["Scheduled versus calendar availability", "/knowledge/scheduled-vs-calendar-availability", "scheduled versus calendar availability an availability measure depends on which observation time is included in its denominator."],
    ["Selecting standards for an equipment management program", "/knowledge/standards-selection", "selecting standards for an equipment management program standards selection begins with scope, intended use, jurisdiction, contracts and the organization's actual activities."],
    ["Introduction to survival and censored observations", "/knowledge/survival-and-censoring", "introduction to survival and censored observations survival analysis accounts for time to an event and observations that end before the event occurs."],
    ["Designing a maintenance work order lifecycle", "/knowledge/work-order-lifecycle", "designing a maintenance work order lifecycle a work order connects an identified need to authorized execution, verification and closure."],
    ["Manufacturer and industry partnership pathways", "/partnerships/manufacturers", "manufacturer and industry partnership pathways proposed collaboration in lifecycle information, service education and equipment interoperability."],
    ["Research methodology and reproducibility", "/research/methods", "research methodology and reproducibility a practical research workflow for engineering and mathematical investigations of physical assets."],
    ["Synthetic availability study", "/research/synthetic-availability-study", "synthetic availability study a reproducible educational working note using three fictional assets, not hospital data or peer-reviewed research."],
    ["Trivsel frameworks and standards development", "/standards/frameworks", "trivsel frameworks and standards development original readiness and equipment management frameworks supported by lawful external references."],
    ["University and academic collaboration programs", "/universities/programs", "university and academic collaboration programs proposed curriculum, capstone, research and laboratory collaboration pathways."],
    ["Open Trivsel", "https://trivsel.uk/", "application product sign in"]
  ];

  const render = (value = "") => {
    if (!results) return;
    const q = value.trim().toLowerCase();
    const rows = index.filter(([title, , terms]) =>
      !q || title.toLowerCase().includes(q) || terms.includes(q)
    );
    results.innerHTML = rows.map(([title, href]) =>
      `<a class="tv-search-result" href="${href}">${title}</a>`
    ).join("");
  };

  const openSearch = () => {
    if (!searchPanel) return;
    searchPanel.hidden = false;
    render("");
    requestAnimationFrame(() => searchInput?.focus());
  };
  const closeSearch = () => {
    if (!searchPanel) return;
    searchPanel.hidden = true;
    searchOpen?.focus();
  };

  searchOpen?.addEventListener("click", openSearch);
  searchClose?.addEventListener("click", closeSearch);
  searchInput?.addEventListener("input", (event) => render(event.target.value));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchPanel && !searchPanel.hidden) closeSearch();
  });
})();

// Progressive enhancement: restrained section reveals.
// Content remains usable without JavaScript.
(() => {
  if (!("IntersectionObserver" in window)) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  const sections = document.querySelectorAll(
    ".tv-feature-card, .tv-industry-card, .tv-module-grid article, .tv-role-grid article"
  );

  sections.forEach((element) => element.classList.add("tv-reveal"));

  const observer = new IntersectionObserver(
    (entries, instance) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      }
    },
    { threshold: 0.08 }
  );

  sections.forEach((element) => observer.observe(element));
})();


// ============================================================================
// APPROVED TRIVSEL GLOBAL HEADER DROPDOWNS
// ============================================================================

(() => {
  const groups = [...document.querySelectorAll(".tv-nav-group")];

  const closeAll = (except = null) => {
    for (const group of groups) {
      if (group === except) continue;

      group.classList.remove("is-open");

      const trigger = group.querySelector("[data-dropdown-trigger]");
      if (trigger) {
        trigger.setAttribute("aria-expanded", "false");
      }
    }
  };

  for (const group of groups) {
    const trigger = group.querySelector("[data-dropdown-trigger]");
    const dropdown = group.querySelector("[data-dropdown]");

    if (!trigger || !dropdown) continue;

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();

      const opening = !group.classList.contains("is-open");

      closeAll(group);

      group.classList.toggle("is-open", opening);
      trigger.setAttribute("aria-expanded", String(opening));
    });

    group.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;

      group.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
      trigger.focus();
    });
  }

  document.addEventListener("click", (event) => {
    if (event.target.closest(".tv-nav-group")) return;
    closeAll();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 1180) {
      closeAll();
    }
  });
})();
