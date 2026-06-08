import { useNavigate } from "react-router-dom";

const faqs = [
  {
    q: "What is FinFlow?",
    a: "FinFlow is a premium financial operations demo platform for small businesses, built to showcase budget control, reporting, and transaction workflows.",
  },
  {
    q: "Does the platform already work?",
    a: "Yes. The current demo includes working dashboards, categories, budgets, transactions, reports, and a protected product workspace.",
  },
  {
    q: "What can be added next?",
    a: "Future expansion can include invoice workflows, exports, summaries, forecasting, integrations, and external system connections.",
  },
  {
    q: "Who is it for?",
    a: "The product is positioned for modern small businesses that need cleaner operational visibility across finance workflows.",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-v3">
      <header className="public-navbar-v3">
        <div onClick={() => navigate("/")} className="public-brand-v3">
          <div className="public-brand-mark-v3">F</div>
          <span>FinFlow</span>
        </div>

        <nav className="public-nav-links-v3">
          <a href="#features">Features</a>
          <a href="#resources">Resources</a>
          <a href="#faq">Questions</a>
        </nav>

        <div className="public-nav-actions-v3">
          <button
            className="ghost-button-dark"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
          <button className="cta-button-v3" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </div>
      </header>

      <section className="hero-v3">
        <div className="hero-copy-v3">
          <span className="pill-v3">FINANCIAL OPERATIONS PLATFORM</span>

          <h1 className="hero-title-v3">
            Modern financial management for growing businesses.
          </h1>

          <p className="hero-subtitle-v3">
            FinFlow helps teams control budgets, manage transactions, review
            performance, and build more structured financial workflows from a
            single product experience.
          </p>

          <div className="hero-actions-v3">
            <button
              className="cta-button-v3 large"
              onClick={() => navigate("/login")}
            >
              Book a Demo
            </button>
            <button
              className="ghost-button-v3 large"
              onClick={() => navigate("/login")}
            >
              Explore Platform
            </button>
          </div>
        </div>
      </section>

      <section className="hero-product-v3">
        <div className="product-shell-v3">
          <aside className="product-sidebar-v3">
            <div className="product-sidebar-pill-v3"></div>
            <ul>
              <li>Overview</li>
              <li className="active">Budgets</li>
              <li>Transactions</li>
              <li>Reports</li>
              <li>Categories</li>
            </ul>
          </aside>

          <div className="product-main-v3">
            <div className="product-topbar-v3">
              <h3>Budget Performance</h3>
              <button className="mini-button-v3">This Month</button>
            </div>

            <div className="product-stats-v3">
              <div className="mini-stat-v3">
                <span>Total Income</span>
                <strong>$13,200</strong>
              </div>
              <div className="mini-stat-v3">
                <span>Total Expenses</span>
                <strong>$3,733</strong>
              </div>
              <div className="mini-stat-v3">
                <span>Net Balance</span>
                <strong>$9,466</strong>
              </div>
            </div>

            <div className="budget-card-v3">
              <div className="budget-row-v3">
                <div>
                  <h4>Office Rent</h4>
                  <p>Near budget limit</p>
                </div>
                <strong>$1,200 / $1,300</strong>
              </div>
              <div className="progress-track-v3">
                <div
                  className="progress-fill-v3 warning"
                  style={{ width: "92%" }}
                ></div>
              </div>
            </div>

            <div className="budget-card-v3">
              <div className="budget-row-v3">
                <div>
                  <h4>Marketing</h4>
                  <p>Healthy budget usage</p>
                </div>
                <strong>$320 / $500</strong>
              </div>
              <div className="progress-track-v3">
                <div
                  className="progress-fill-v3 normal"
                  style={{ width: "64%" }}
                ></div>
              </div>
            </div>

            <div className="chart-card-v3">
              <div className="chart-header-v3">
                <h4>Monthly transaction overview</h4>
                <span>Updated live</span>
              </div>
              <div className="fake-chart-v3">
                <div className="bar-v3 h1"></div>
                <div className="bar-v3 h2"></div>
                <div className="bar-v3 h3"></div>
                <div className="bar-v3 h4"></div>
                <div className="bar-v3 h5"></div>
                <div className="bar-v3 h6"></div>
                <div className="bar-v3 h7"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="section-v3">
        <div className="section-head-v3">
          <h2>Explore our financial feature set.</h2>
        </div>

        <div className="feature-panels-v3">
          <div className="feature-panel-v3 soft">
            <span className="feature-tag-v3">CONTROL</span>
            <h3>Control budgets with more structure and less friction.</h3>
            <div className="panel-box-v3">
              <p>Budget categories</p>
              <div className="panel-list-v3">
                <span>Office Rent</span>
                <span>Marketing</span>
                <span>Software</span>
              </div>
            </div>
          </div>

          <div className="feature-panel-v3 blue">
            <span className="feature-tag-v3">REPORTING</span>
            <h3>Review reports and financial movement with clarity.</h3>
            <div className="panel-box-v3 white">
              <p>
                Payments, summaries, and analytics become easier to understand.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-v3 value-strip-v3">
        <div className="value-card-v3">
          <span>Single workspace</span>
          <strong>Budgets, reports, and transactions in one flow.</strong>
        </div>
        <div className="value-card-v3">
          <span>Decision support</span>
          <strong>
            Built for financial visibility and operational clarity.
          </strong>
        </div>
        <div className="value-card-v3">
          <span>Expansion-ready</span>
          <strong>
            Ready to evolve into exports, invoices, summaries, and forecasting.
          </strong>
        </div>
      </section>

      <section id="resources" className="section-v3 split-feature-v3">
        <div className="split-image-v3">
          <div className="mock-visual-v3">
            <div className="floating-stat-v3">$1,258</div>
          </div>
        </div>

        <div className="split-copy-v3">
          <span className="pill-v3 light">FINANCIAL</span>
          <h2>
            Comprehensive Financial <span>Analytics</span>
          </h2>
          <p>
            Revolutionize decision-making with structured dashboards, category
            visibility, reporting workflows, and premium product design.
          </p>

          <div className="check-grid-v3">
            <span>Budget intelligence</span>
            <span>Digital finance workflows</span>
            <span>Operational clarity</span>
            <span>Business growth visibility</span>
          </div>
        </div>
      </section>

      <section className="section-v3 feature-grid-3-v3">
        <div className="feature-card-mini-v3">
          <span className="feature-card-label-v3">Automation potential</span>
          <h3>Weekly summaries</h3>
          <p>
            Build toward scheduled business updates and recurring financial
            snapshots.
          </p>
        </div>

        <div className="feature-card-mini-v3">
          <span className="feature-card-label-v3">Resources</span>
          <h3>Invoice exports</h3>
          <p>
            Prepare the product for downloadable reports, export pipelines, and
            invoice workflows.
          </p>
        </div>

        <div className="feature-card-mini-v3">
          <span className="feature-card-label-v3">Growth layer</span>
          <h3>Forecasting</h3>
          <p>
            Extend FinFlow into projections, scenario planning, and financial
            insight generation.
          </p>
        </div>
      </section>

      <section className="section-v3 cta-band-v3">
        <div className="cta-band-card-v3">
          <div>
            <span className="pill-v3">DEMO PRODUCT</span>
            <h2>Explore the workspace and product flow.</h2>
            <p>
              FinFlow is designed as a premium demo that already feels like a
              real financial product.
            </p>
          </div>

          <div className="hero-actions-v3">
            <button
              className="cta-button-v3 large"
              onClick={() => navigate("/login")}
            >
              Launch Demo
            </button>
            <button
              className="ghost-button-v3 large"
              onClick={() => navigate("/login")}
            >
              View Product
            </button>
          </div>
        </div>
      </section>

      <section id="faq" className="section-v3 faq-v3">
        <div className="section-head-v3 left">
          <h2>Questions</h2>
        </div>

        <div className="faq-list-v3">
          {faqs.map((item) => (
            <details key={item.q} className="faq-item-v3">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <footer className="footer-v3">
        <div className="footer-brand-v3">
          <div className="public-brand-mark-v3">F</div>
          <div>
            <strong>FinFlow</strong>
            <p>
              Premium financial operations demo for modern small businesses.
            </p>
          </div>
        </div>

        <div className="footer-columns-v3">
          <div>
            <h4>Platform</h4>
            <a href="#features">Features</a>
            <a href="#resources">Resources</a>
            <a href="#faq">Questions</a>
          </div>
          <div>
            <h4>Modules</h4>
            <span>Budgets</span>
            <span>Transactions</span>
            <span>Reports</span>
          </div>
          <div>
            <h4>Future</h4>
            <span>Invoices</span>
            <span>Exports</span>
            <span>Forecasting</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
