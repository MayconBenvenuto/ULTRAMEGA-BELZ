import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from './ThemeContext';
import Dashboard from './Dashboard';

describe('Dashboard Component', () => {
  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider>
        {component}
      </ThemeProvider>
    );
  };

  test('renderiza todas as seções do dashboard', () => {
    renderWithTheme(<Dashboard />);
    
    expect(screen.getByText(/Saúde/i)).toBeInTheDocument();
    expect(screen.getByText(/Vida/i)).toBeInTheDocument();
    expect(screen.getByText(/Frota/i)).toBeInTheDocument();
  });

  test('gráficos são renderizados corretamente', () => {
    renderWithTheme(<Dashboard />);
    
    // Verifica se os containers dos gráficos estão presentes
    const charts = screen.getAllByRole('graphics-document');
    expect(charts.length).toBeGreaterThan(0);
  });

  test('dark theme funciona corretamente', () => {
    renderWithTheme(<Dashboard />);
    
    const themeToggle = screen.getByRole('button', { name: /🌙|🌞/i });
    userEvent.click(themeToggle);
    
    expect(document.querySelector('.dark-theme')).toBeInTheDocument();
  });
});
