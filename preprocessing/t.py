from sklearn.datasets import load_wine
from sklearn.manifold import MDS
import matplotlib.pyplot as plt

mds = MDS(
    n_components=2,
    metric=True,
    dissimilarity='euclidean'
)


wine = load_wine()
mds = MDS(n_components=2,metric=True,dissimilarity='euclidean')
X = mds.fit_transform(wine.data)

#x, y
plt.scatter(X[:,0],X[:,1])