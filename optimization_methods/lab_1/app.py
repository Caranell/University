import scipy as sp
import matplotlib.pyplot as plt

x = [-10, -9, -8.1, -7, -6, -5, -4.2, -3, -2, -1, 0, 1, 2, 3.1, 4, 5, 6.2, 7, 8]
y = [77, 63.7, 52.927, 41.3, 32.2, 24.5, 19.348, 13.3, 9.8,
     7.7, 7, 7.7, 9.8, 13.727, 18.2, 24.5, 33.908, 41.3, 51.8]
plt.figure(figsize=(8, 6))
plt.xlabel("X")
plt.ylabel("Y")
plt.autoscale(tight=True)

# рисуем исходные точки
plt.scatter(x, y)

legend = []
for d in range(1, 3):
    # получаем параметры модели для полинома степени d
    fp, residuals, rank, sv, rcond = sp.polyfit(x, y, d, full=True)
    f = sp.poly1d(fp)
    plt.plot(x, f(x), linewidth=2)
    legend.append("d=%i" % f.order)
    print("Полином %d-й степени:" % f.order)
    print(f)
    e = 0
    for i in range(len(x)):
        e += pow(f(x[i]) - y[i], 2)
    print(e)
    print('\n\n')

plt.legend(legend, loc="upper left")
plt.grid()
plt.show()
