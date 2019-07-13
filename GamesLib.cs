using System.IO;

namespace HLSR
{
    class GamesLib
    {
        public static bool CheckInstalled(string gameName)
        {
            if (File.Exists($@".\Half-Life\{gameName}\liblist.gam"))
            {
                return true;
            }
            return false;
        }
    }
}
