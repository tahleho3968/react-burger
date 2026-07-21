import './App.css';
import { useState } from 'react';

// =====================================================
// BELOW ARE COMPONENTS USED FOR TOP AND BOTTOM BREAD 🍞
// =====================================================

function TopBread() {
  return (
    <div className="bread top-bread">
      <div className="sesame-seeds">
        <span>·</span>
        <span>·</span>
        <span>·</span>
        <span>·</span>
        <span>·</span>
      </div>
      <div className="bread-label">🍞 Top Bun</div>
    </div>
  );
}

function BottomBread() {
  return (
    <div className="bread bottom-bread">
      <div className="bread-label">🍞 Bottom Bun</div>
    </div>
  );
}

// ============================================
// FILLING COMPONENTS
// ============================================

interface FillingProps {
  show: boolean;
}

function Tomato({ show }: FillingProps) {
  if (!show) return null;
  return (
    <div className="filling tomato">
      <span className="filling-icon">🍅</span>
      <span className="filling-label">Tomato</span>
    </div>
  );
}

function Meat({ show }: FillingProps) {
  if (!show) return null;
  return (
    <div className="filling meat">
      <span className="filling-icon">🥩</span>
      <span className="filling-label">Meat Patty</span>
    </div>
  );
}

function Lettuce({ show }: FillingProps) {
  if (!show) return null;
  return (
    <div className="filling lettuce">
      <span className="filling-icon">🥬</span>
      <span className="filling-label">Lettuce</span>
    </div>
  );
}

function Cheese({ show }: FillingProps) {
  if (!show) return null;
  return (
    <div className="filling cheese">
      <span className="filling-icon">🧀</span>
      <span className="filling-label">Cheese</span>
    </div>
  );
}

function Onion({ show }: FillingProps) {
  if (!show) return null;
  return (
    <div className="filling onion">
      <span className="filling-icon">🧅</span>
      <span className="filling-label">Onion</span>
    </div>
  );
}

function Pickle({ show }: FillingProps) {
  if (!show) return null;
  return (
    <div className="filling pickle">
      <span className="filling-icon">🥒</span>
      <span className="filling-label">Pickle</span>
    </div>
  );
}

function Bacon({ show }: FillingProps) {
  if (!show) return null;
  return (
    <div className="filling bacon">
      <span className="filling-icon">🥓</span>
      <span className="filling-label">Bacon</span>
    </div>
  );
}

// ============================================
// 🍔 MAIN BURGER COMPONENT
// ============================================

interface FillingState {
  tomato: boolean;
  meat: boolean;
  lettuce: boolean;
  cheese: boolean;
  onion: boolean;
  pickle: boolean;
  bacon: boolean;
}

function Burger() {
  const [fillings, setFillings] = useState<FillingState>({
    tomato: true,
    meat: true,
    lettuce: true,
    cheese: false,
    onion: false,
    pickle: false,
    bacon: false,
  });

  const [isOpen, setIsOpen] = useState(false);

  const toggleFilling = (name: keyof FillingState) => {
    setFillings((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const toggleAll = (value: boolean) => {
    const newState = {} as FillingState;
    for (const key in fillings) {
      newState[key as keyof FillingState] = value;
    }
    setFillings(newState);
  };

  const getFillingCount = () => {
    return Object.values(fillings).filter(Boolean).length;
  };

  const fillingLabels: Record<keyof FillingState, string> = {
    tomato: '🍅 Tomato',
    meat: '🥩 Meat',
    lettuce: '🥬 Lettuce',
    cheese: '🧀 Cheese',
    onion: '🧅 Onion',
    pickle: '🥒 Pickle',
    bacon: '🥓 Bacon',
  };

  return (
    <div className="burger-wrapper">
      {/* 🍔 Burger Display */}
      <div className="burger-container">
        <div className="burger-visual">
          <TopBread />
          <div className="fillings-stack">
            <Tomato show={fillings.tomato} />
            <Cheese show={fillings.cheese} />
            <Meat show={fillings.meat} />
            <Bacon show={fillings.bacon} />
            <Onion show={fillings.onion} />
            <Pickle show={fillings.pickle} />
            <Lettuce show={fillings.lettuce} />
          </div>
          <BottomBread />
        </div>

        {/* 🏷️ Burger Label */}
        <div className="burger-label">
          <span className="burger-emoji">🍔</span>
          <span className="burger-name">Your Custom Burger</span>
          <span className="burger-count">{getFillingCount()} fillings</span>
        </div>
      </div>

      {/* 🎛️ Controls Panel */}
      <div className="controls-panel">
        <div className="controls-header">
          <h3>🎛️ Customize Your Burger</h3>
          <button
            className="toggle-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? '▲' : '▼'}
          </button>
        </div>

        {isOpen && (
          <div className="controls-body">
            <div className="controls-actions">
              <button
                className="action-btn select-all"
                onClick={() => toggleAll(true)}
              >
                ✅ Select All
              </button>
              <button
                className="action-btn deselect-all"
                onClick={() => toggleAll(false)}
              >
                ❌ Deselect All
              </button>
            </div>

            <div className="controls-grid">
              {(Object.keys(fillings) as Array<keyof FillingState>).map((key) => (
                <label key={key} className="control-item">
                  <input
                    type="checkbox"
                    checked={fillings[key]}
                    onChange={() => toggleFilling(key)}
                  />
                  <span className={`filling-dot ${key}`}></span>
                  {fillingLabels[key]}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// 🚀 MAIN APP
// ============================================

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🍔 ACA Burger Builder</h1>
        <p>Build your perfect burger: toggle fillings on/off!</p>
      </header>
      <Burger />
      <footer className="app-footer">
        <p>Made with ❤️ at Africa Code Academy</p>
        <p>&copy;  By Tahleho Paki AKA Naazoh The Alien</p>
      </footer>
    </div>
  );
}

export default App;
