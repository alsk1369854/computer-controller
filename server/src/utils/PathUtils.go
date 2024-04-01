package utils

import (
	"os"
	"os/exec"
	"path/filepath"
	"strings"
)

type pathUtils struct {
}

var pathUtilsInstance *pathUtils = &pathUtils{}

func GetPathUtils() *pathUtils {
	return pathUtilsInstance
}

func (pu *pathUtils) GetAppPath() string {
	file, _ := exec.LookPath(os.Args[0])
	path, _ := filepath.Abs(file)
	index := strings.LastIndex(path, string(os.PathSeparator))
	return path[:index]
}
