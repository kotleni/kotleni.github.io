scripts_dir="/Users/kotleni/Scripts"
py_scripts=(marketcheck tg-birthday clean-desktop)

# clear and show motd
clear
cowsay "Welcome"

# run all py scripts
for script in $py_scripts; do
    python3 $scripts_dir/$script.py
done

# set path
export PATH="/opt/homebrew/opt/bc/bin:$PATH"

# set aliases
alias code=Scripts/code.sh

# zsh config
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="edvardm"
plugins=(git)

# invoke ohmyzsh
source $ZSH/oh-my-zsh.sh
