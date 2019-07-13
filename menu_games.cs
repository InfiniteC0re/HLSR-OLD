using System;
using System.Linq;
using System.Windows.Forms;

namespace HLSR
{
    public partial class menu_games : UserControl
    {
        Game[] lib;
        public menu_games()
        {
            InitializeComponent();
            GamesLib.UpdateLib();
            lib = GamesLib.GetLibrary();
            agButton.Text = lib[0].installed == true ? "START" : "INSTALL";
            hlButton.Text = lib[1].installed == true ? "START" : "INSTALL";
            bsButton.Text = lib[2].installed == true ? "START" : "INSTALL";
            ofButton.Text = lib[3].installed == true ? "START" : "INSTALL";
            Panel[] panels = Controls.OfType<Panel>().ToArray();
            Theme.ApplyTheme(panels, this);
        }

        private void ChangeFocus(object sender, EventArgs e)
        {
            hlpanel.Focus();
        }
    }
}
