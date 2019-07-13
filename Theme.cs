using System.Drawing;
using System.Linq;
using System.Windows.Forms;

namespace HLSR
{
    class Theme
    {
        static Color text_c = Color.SlateGray;
        static Color panel_c = Color.FromArgb(14, 14, 14);
        static Color background_c = Color.FromArgb(18, 18, 18);
        static Color button_c = Color.FromArgb(18, 18, 18);
        static Color button_click_c = Color.FromArgb(28, 28, 28);
        static Color button_active_c = Color.FromArgb(100, 100, 227);
        public static void ApplyTheme(Panel[] panels, Control background)
        {
            foreach (Panel panel in panels)
            {
                Button[] buttons = panel.Controls.OfType<Button>().ToArray();
                if (panel.Name == "buttonsPanel")
                {
                    buttons[buttons.Length - 2].ForeColor = button_active_c;
                    buttons[buttons.Length - 2].BackColor = button_c;
                };
                foreach (Button button in buttons)
                {
                    button.FlatAppearance.MouseDownBackColor = button_click_c;
                };
                panel.BackColor = panel_c;
            }
            background.BackColor = background_c;
            background.ForeColor = text_c;
        }
        public static void ChangeActiveButton(Panel panel, string buttonText)
        {
            Button[] buttons = panel.Controls.OfType<Button>().ToArray();
            foreach(Button button in buttons)
            {
                if(button.Text == buttonText)
                {
                    button.ForeColor = button_active_c;
                    button.BackColor = button_c;
                }
                else
                {
                    button.ForeColor = text_c;
                    button.BackColor = panel_c;
                };
            }
        }
    }
}
