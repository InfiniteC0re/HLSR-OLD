using System.IO;
using System.Windows.Forms;

namespace HLSR
{
    class Game
    {
        public string gamename { get; }
        public string directory { get; }
        public bool installed { get; set; }
        public Game(string name, string dir)
        {
            gamename = name;
            directory = dir;
            installed = GamesLib.CheckInstalled(dir);
        }
    }
    class GamesLib
    {
        public static Game[] library = new Game[4];
        public static bool CheckInstalled(string gameName)
        {
            if (File.Exists($@".\Half-Life\{gameName}\liblist.gam"))
            {
                return true;
            }
            return false;
        }
        public static void UpdateLib()
        {
            library[0] = new Game("OpenAG", "ag");
            library[1] = new Game("Half-Life", "valve");
            library[2] = new Game("Blue Shift", "bshift");
            library[3] = new Game("Opposing Force", "gearbox");
        }
        public static Game[] GetLibrary()
        {
            return library;
        }
    }
}
