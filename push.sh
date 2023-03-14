git add .
git commit -m "fix(全局): 提交代码 `date '+%Y/%m/%d %H:%M:%S'`"
x=1
while [ $x -le 1000 ]
do
  echo "x = $x"
  x=$(( $x + 1 ))
  git push
done