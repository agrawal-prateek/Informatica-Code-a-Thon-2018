
#include <bits/stdc++.h>

using namespace std;

#define SCD(t) scanf("%d",&t)
#define SCLD(t) scanf("%ld",&t)
#define SCLLD(t) scanf("%lld",&t)
#define SCC(t) scanf("%c",&t)
#define SCS(t) scanf("%s",t)
#define SCF(t) scanf("%f",&t)
#define SCLF(t) scanf("%lf",&t)
#define MEM(a, b) memset(a, (b), sizeof(a))
#define FOR(i, j, k, in) for (int i=j ; i<k ; i+=in)
#define RFOR(i, j, k, in) for (int i=j ; i>=k ; i-=in)
#define REP(i, j) FOR(i, 0, j, 1)
#define RREP(i, j) RFOR(i, j, 0, 1)
#define all(cont) cont.begin(), cont.end()
#define rall(cont) cont.end(), cont.begin()
#define FOREACH(it, l) for (auto it = l.begin(); it != l.end(); it++)
#define IN(A, B, C) assert( B <= A && A <= C)
#define MP make_pair
#define PB push_back
#define INF (int)1e9
#define EPS 1e-9
#define PI 3.1415926535897932384626433832795
#define MOD 1000000007
#define read(type) readInt<type>()
//const double pi=acos(-1.0);
typedef pair<int, int> PII;
typedef vector<int> VI;
typedef vector<string> VS;
typedef vector<PII> VII;
typedef vector<VI> VVI;
typedef map<int,int> MPII;
typedef set<int> SETI;
typedef multiset<int> MSETI;
typedef long int int32;
typedef unsigned long int uint32;
typedef long long int int64;
typedef unsigned long long int  uint64;

template<typename T, typename U> inline void amin(T &x, U y) { if(y < x) x = y; }
template<typename T, typename U> inline void amax(T &x, U y) { if(x < y) x = y; }

#define MAXN 100000
#define level 18


vector <int> tree[MAXN];
int depth[MAXN];
vector<int> sp[MAXN];
int parent[MAXN][level];

void dfs(int cur, int prev){
    depth[cur] = depth[prev] + 1;
    sp[cur].assign(sp[prev].begin(),sp[prev].end());
    sp[cur].push_back(cur);
    parent[cur][0] = prev;
    for (int i=0; i<tree[cur].size(); i++){
        if (tree[cur][i] != prev)
            dfs(tree[cur][i], cur);
    }
}

void precomputeSparseMatrix(int n){
    for (int i=1; i<level; i++){
        for (int node = 1; node <= n; node++){
            if (parent[node][i-1] != -1)
                parent[node][i] =
                    parent[parent[node][i-1]][i-1];
        }
    }
}

int lca(int u, int v){
    if (depth[v] < depth[u])
        swap(u, v);
 
    int diff = depth[v] - depth[u];
 
    for (int i=0; i<level; i++)
        if ((diff>>i)&1)
            v = parent[v][i];
 
    if (u == v)
        return u;
 
    for (int i=level-1; i>=0; i--)
        if (parent[u][i] != parent[v][i]){
            u = parent[u][i];
            v = parent[v][i];
        }
 
    return parent[u][0];
}

void addEdge(int u,int v){
    tree[u].push_back(v);
    tree[v].push_back(u);
}

int main(){
	ios_base::sync_with_stdio(false);
	cin.tie(NULL); 
	uint64 N,M;
	cin>>N>>M;
	uint64 u,v;
    memset(parent,-1,sizeof(parent));

	for (int i = 0; i < N-1; ++i){
		cin>>u>>v;
		addEdge(u,v);
	}

	depth[0]=0;
	dfs(N,0);
	precomputeSparseMatrix(N);
	
	int count[N+1];
	for(int i=0;i<=N;i++){
	    count[i]=0;
	}
    int a,b;
	for (int i = 0; i < M; ++i){
		cin>>a>>b;		
		for(int i=sp[lca(a,b)].size()-1;i<sp[a].size();i++){
		   count[sp[a][i]]++;
		}
		
		for(int i=sp[lca(a,b)].size();i<sp[b].size();i++){
		    count[sp[b][i]]++;
		}
		
		
	}
	
	int mx=0;
    for(int i=0;i<=N;i++){
        mx=max(mx,count[i]);
    }
    cout<<mx;
	return 0;
}
