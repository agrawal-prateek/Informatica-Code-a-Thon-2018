

#include <stdio.h>

int f(int x, int y, int total)
{
    int j = 0, tn = 0, n, h = 0;
    for (j = 0; j < total; j++)
    {
        scanf("%d", &h);
        if (h <= x)
        {
            tn += 1;
            continue;
        }

        n = ((h - x) / (x - y));

        n += h - ((x - y) * n) == x ? 1 : 2;

        tn += n;
    }
    return tn;
}
int main()
{
    int ans, x, y, total;

    scanf("%d%d%d", &x, &y, &total);
    ans = f(x, y, total);
    printf("%d\n", ans);

    return 0;
}
